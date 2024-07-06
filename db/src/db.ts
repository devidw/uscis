import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"
import * as schema from "./schema.js"
import { config } from "dotenv"

if (process.env.USER === "devidw") {
  config({
    path: new URL("../../.env", import.meta.url),
  })
}

const client = new pg.Client({
  connectionString: process.env.DB_URL,
})

await client.connect()

export const db = drizzle(client, { schema })
