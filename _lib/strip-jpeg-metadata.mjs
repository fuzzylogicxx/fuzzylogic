/**
 * Remove private metadata (GPS location, camera, timestamps, XMP, IPTC, comments)
 * from a JPEG before it is committed to a public repo.
 *
 * Kept: the image data, JFIF/Adobe/ICC colour segments, and the EXIF Orientation
 * tag, rewritten as a minimal EXIF block. Without it, an unrotated phone photo
 * would display sideways once the rest of EXIF is gone.
 *
 * Anything after the first end-of-image marker is dropped too: iPhone JPEGs can
 * carry extra embedded images (HDR gain map, depth) with their own metadata.
 *
 * Non-JPEG data is returned unchanged. Data that starts like a JPEG but can't be
 * parsed throws, so a photo is never published with its metadata intact.
 */

const SOI = 0xd8
const EOI = 0xd9
const SOS = 0xda
const APP0 = 0xe0
const APP1 = 0xe1
const APP2 = 0xe2
const APP14 = 0xee

export const isJpeg = (buf) => buf.length > 3 && buf[0] === 0xff && buf[1] === SOI && buf[2] === 0xff

const startsWith = (buf, offset, text) => buf.subarray(offset, offset + text.length).toString('latin1') === text

/** Orientation (1–8) from an EXIF APP1 payload (starting at "Exif\0\0"), or undefined. */
function readOrientation(seg) {
	if (!startsWith(seg, 0, 'Exif\0\0')) return undefined
	const tiff = 6
	const order = seg.toString('latin1', tiff, tiff + 2)
	if (order !== 'II' && order !== 'MM') return undefined
	const le = order === 'II'
	const u16 = (o) => (le ? seg.readUInt16LE(o) : seg.readUInt16BE(o))
	const u32 = (o) => (le ? seg.readUInt32LE(o) : seg.readUInt32BE(o))
	try {
		const ifd = tiff + u32(tiff + 4)
		const count = u16(ifd)
		for (let i = 0; i < count; i++) {
			const entry = ifd + 2 + i * 12
			if (u16(entry) === 0x0112) {
				const value = u16(entry + 8)
				return value >= 1 && value <= 8 ? value : undefined
			}
		}
	} catch {
		// Truncated or corrupt EXIF: treat as no orientation.
	}
	return undefined
}

/** A minimal big-endian EXIF APP1 segment holding only the Orientation tag. */
function orientationSegment(orientation) {
	return Buffer.from([
		0xff, APP1, 0x00, 0x22, // marker + length (34)
		0x45, 0x78, 0x69, 0x66, 0x00, 0x00, // "Exif\0\0"
		0x4d, 0x4d, 0x00, 0x2a, 0x00, 0x00, 0x00, 0x08, // TIFF header (MM), IFD0 at 8
		0x00, 0x01, // one entry
		0x01, 0x12, 0x00, 0x03, 0x00, 0x00, 0x00, 0x01, 0x00, orientation, 0x00, 0x00, // Orientation, SHORT
		0x00, 0x00, 0x00, 0x00, // no next IFD
	])
}

export function stripJpegMetadata(buf) {
	if (!isJpeg(buf)) return buf

	const kept = []
	let orientation
	let pos = 2
	let scan = null

	while (pos < buf.length && !scan) {
		if (buf[pos] !== 0xff) throw new Error('Image is not a valid JPEG')
		while (buf[pos] === 0xff) pos++ // fill bytes
		const marker = buf[pos++]
		if (marker === EOI) break
		if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue // no length
		if (pos + 2 > buf.length) throw new Error('Image is not a valid JPEG')
		const length = buf.readUInt16BE(pos)
		const end = pos + length
		if (length < 2 || end > buf.length) throw new Error('Image is not a valid JPEG')
		const payload = buf.subarray(pos + 2, end)

		if (marker === SOS) {
			scan = buf.subarray(pos - 2) // header + entropy-coded data, up to the end marker
			break
		}
		if (marker === APP1) {
			orientation ??= readOrientation(payload)
		} else if (
			// Structural segments and the colour profile / Adobe colour transform stay;
			// every other APPn and comment (GPS, XMP, IPTC, MPF, text) goes.
			marker === APP0 ||
			marker === APP14 ||
			(marker === APP2 && startsWith(payload, 0, 'ICC_PROFILE')) ||
			!(marker >= 0xe0 && marker <= 0xef || marker === 0xfe)
		) {
			kept.push(buf.subarray(pos - 2, end))
		}
		pos = end
	}
	if (!scan) throw new Error('Image is not a valid JPEG')

	// The first FF D9 after the scan header is the real end of image: inside
	// entropy-coded data FF is always followed by 00 or a restart marker.
	const eoi = scan.indexOf(Buffer.from([0xff, EOI]))
	if (eoi === -1) throw new Error('Image is not a valid JPEG')
	const body = scan.subarray(0, eoi + 2)

	const leading = []
	const rest = [...kept]
	while (rest[0] && rest[0][1] === APP0) leading.push(rest.shift())
	const exif = orientation && orientation !== 1 ? [orientationSegment(orientation)] : []
	return Buffer.concat([Buffer.from([0xff, SOI]), ...leading, ...exif, ...rest, body])
}

/** base64 in, base64 out. */
export function stripJpegMetadataBase64(base64) {
	const input = Buffer.from(base64, 'base64')
	if (!isJpeg(input)) return base64
	return stripJpegMetadata(input).toString('base64')
}
