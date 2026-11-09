import assert from 'node:assert/strict'
import test from 'node:test'
import sharp from 'sharp'
import { buildPost } from '../_lib/build-post.mjs'
import { stripJpegMetadata, stripJpegMetadataBase64 } from '../_lib/strip-jpeg-metadata.mjs'

const now = new Date('2025-07-05T16:41:00Z')

const segment = (marker, payload) => {
	const body = Buffer.from(payload, 'latin1')
	const head = Buffer.alloc(4)
	head.writeUInt16BE(0xff00 | marker, 0)
	head.writeUInt16BE(body.length + 2, 2)
	return Buffer.concat([head, body])
}

/** Little-endian EXIF with GPS-ish text and an Orientation entry. */
function exifPayload(orientation) {
	const tiff = Buffer.alloc(8 + 2 + 12 + 4)
	tiff.write('II', 0, 'latin1')
	tiff.writeUInt16LE(42, 2)
	tiff.writeUInt32LE(8, 4)
	tiff.writeUInt16LE(1, 8)
	tiff.writeUInt16LE(0x0112, 10)
	tiff.writeUInt16LE(3, 12)
	tiff.writeUInt32LE(1, 14)
	tiff.writeUInt16LE(orientation, 18)
	return Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), tiff, Buffer.from('GPSLatitude 55.86 N secret', 'latin1')])
}

function fakeJpeg({ orientation = 6 } = {}) {
	return Buffer.concat([
		Buffer.from([0xff, 0xd8]),
		segment(0xe0, 'JFIF\0\x01\x01\0\0\x01\0\x01\0\0'),
		segment(0xe1, exifPayload(orientation).toString('latin1')),
		segment(0xe1, 'http://ns.adobe.com/xap/1.0/\0<x:xmpmeta>secret-xmp</x:xmpmeta>'),
		segment(0xed, 'Photoshop 3.0\0secret-iptc'),
		segment(0xfe, 'secret comment'),
		segment(0xe2, 'ICC_PROFILE\0\x01\x01profile-bytes'),
		segment(0xdb, '\0quant-table'),
		segment(0xda, '\x01\x01\0\0\x3f\0'),
		Buffer.from([0x12, 0xff, 0x00, 0x34, 0xff, 0xd9]), // entropy data with a stuffed FF
		Buffer.from('trailing-embedded-image secret-gain-map'),
	])
}

test('removes GPS, XMP, IPTC, comments and trailing data; keeps image and ICC', () => {
	const out = stripJpegMetadata(fakeJpeg()).toString('latin1')
	for (const secret of ['GPSLatitude', 'secret-xmp', 'secret-iptc', 'secret comment', 'trailing-embedded', 'xmpmeta']) {
		assert.ok(!out.includes(secret), `still contains ${secret}`)
	}
	assert.ok(out.includes('JFIF'))
	assert.ok(out.includes('ICC_PROFILE'))
	assert.ok(out.includes('quant-table'))
	assert.ok(out.endsWith('\x12\xff\x00\x34\xff\xd9'))
})

test('keeps only the Orientation tag, right after the JFIF segment', () => {
	const out = stripJpegMetadata(fakeJpeg({ orientation: 6 }))
	const at = out.indexOf('Exif\0\0', 0, 'latin1')
	assert.ok(at > out.indexOf('JFIF', 0, 'latin1'))
	assert.equal(out.readUInt16BE(at + 6 + 8 + 2 + 8), 6) // value of the single IFD entry
	assert.equal(out.readUInt16BE(at - 2), 34) // minimal segment length
})

test('orientation 1 or none leaves no EXIF at all', () => {
	assert.ok(!stripJpegMetadata(fakeJpeg({ orientation: 1 })).includes('Exif'))
})

test('non-JPEG data passes through untouched', () => {
	assert.equal(stripJpegMetadataBase64('QUJD'), 'QUJD')
	const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 1, 2, 3, 4]).toString('base64')
	assert.equal(stripJpegMetadataBase64(png), png)
})

test('a JPEG that cannot be parsed throws instead of publishing it unstripped', () => {
	const broken = Buffer.concat([Buffer.from([0xff, 0xd8]), segment(0xe1, 'x').subarray(0, 3)])
	assert.throws(() => stripJpegMetadata(Buffer.concat([broken, Buffer.from([0xff])])), /not a valid JPEG/)
	const noScan = Buffer.concat([Buffer.from([0xff, 0xd8]), segment(0xe0, 'JFIF\0'), Buffer.from([0xff, 0xd9])])
	assert.throws(() => stripJpegMetadata(noScan), /not a valid JPEG/)
})

test('a real JPEG stays decodable, with pixels unchanged and GPS gone', async () => {
	const pixels = await sharp({ create: { width: 40, height: 30, channels: 3, background: '#c33' } })
		.jpeg({ quality: 90 })
		.withExif({ IFD0: { Copyright: 'secret-copyright' }, IFD3: { GPSLatitudeRef: 'N', GPSLatitude: '55/1 51/1 0/1' } })
		.toBuffer()
	assert.ok(pixels.includes('secret-copyright'))

	const out = stripJpegMetadata(pixels)
	assert.ok(!out.includes('secret-copyright'))
	const meta = await sharp(out).metadata()
	assert.equal(meta.width, 40)
	assert.equal(meta.height, 30)
	assert.equal(meta.exif, undefined)

	const before = await sharp(pixels).raw().toBuffer()
	const after = await sharp(out).raw().toBuffer()
	assert.ok(before.equals(after), 'pixel data changed')
})

test('buildPost commits the stripped image', () => {
	const { image } = buildPost(
		{ type: 'note', comment: 'c', tags: ['music'], image: { data: fakeJpeg().toString('base64'), ext: 'jpg' } },
		now,
	)
	const out = Buffer.from(image.base64, 'base64').toString('latin1')
	assert.ok(!out.includes('GPSLatitude'))
})
