import { date, pgTable, varchar } from "drizzle-orm/pg-core"

export const cases = pgTable("cases", {
  id: varchar("id", { length: 13 }).primaryKey(),
  email: varchar("email", { length: 256 }),
  last_status: varchar("last_status", { length: 256 }).default(""),
  last_check: date("last_check"),
})
