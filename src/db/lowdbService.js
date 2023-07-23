// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')
console.log('db file generated on : ', file)

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file)
const defaultData = { users: [], sessionLogin: [] }
const db = new Low(adapter, defaultData)
export { db }
