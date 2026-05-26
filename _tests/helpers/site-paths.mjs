import path from 'node:path'
import { fileURLToPath } from 'node:url'

const helpersDir = path.dirname(fileURLToPath(import.meta.url))
const testsDir = path.resolve(helpersDir, '..')

export const siteDir = process.env.SITE_DIR
	? path.resolve(process.env.SITE_DIR)
	: path.resolve(testsDir, '..', '_site')
