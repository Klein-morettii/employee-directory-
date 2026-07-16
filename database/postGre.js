import { Pool } from 'pg'

const daBa = pool()
const connection = new Pool({
    connectionString: process.env.DATABASE_URL
})

await connection.connect()
