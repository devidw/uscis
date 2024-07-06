import * as schema from "db/dist/schema.js"
import { db } from "db/dist/db.js"
import { check } from "shared/dist/checker.js"
import { ne } from "drizzle-orm"
import { Resend } from "resend"
import { config } from "dotenv"

if (process.env.USER === "devidw") {
  config({
    path: new URL("../../.env", import.meta.url),
  })
}

const resend = new Resend(process.env.RESEND_API_KEY)

const toBeChecked = await db
  .select()
  .from(schema.cases)
  .where(ne(schema.cases.email, ""))

await Promise.all(
  toBeChecked.map(async (one) => {
    try {
      const status = await check(one.id)

      await db.update(schema.cases).set({
        last_check: new Date().toISOString(),
        last_status: status.actionCodeText,
      })

      if (status.actionCodeText === one.last_status) return

      await resend.emails.send({
        from: "d@wolf.gdn",
        to: one.email!,
        subject: status.actionCodeText,
        text: status.actionCodeDesc,
      })
    } catch (e) {
      console.error(e)
    }
  })
)

process.exit(0)
