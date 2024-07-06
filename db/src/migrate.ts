import { migrate } from "drizzle-orm/node-postgres/migrator"
import { db } from "./db.js"

await migrate(db, {
  migrationsFolder: new URL("../migrations", import.meta.url).pathname,
})

process.exit(0)
