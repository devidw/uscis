import * as schema from "db/dist/schema.js"
import { db } from "db/dist/db.js"
import { check } from "shared/dist/checker.js"
import { eq, ne } from "drizzle-orm"
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
      console.info(`[${one.id}]: start`)

      const status = await check(one.id)

      await db
        .update(schema.cases)
        .set({
          last_check: new Date().toISOString(),
          last_status: status.actionCodeText,
        })
        .where(eq(schema.cases.id, one.id))

      if (status.actionCodeText === one.last_status) return

      const out = await resend.emails.send({
        from: "uscis@resend.wolf.gdn",
        to: one.email!,
        subject: status.actionCodeText,
        text: status.actionCodeDesc,
      })

      console.info(`[${one.id}: ${JSON.stringify(out.data)}]`)

      if (out.error) {
        throw out.error
      }
    } catch (e) {
      console.error(e)
    } finally {
      console.info(`[${one.id}]: done`)
    }
  })
)

console.info("done")

process.exit(0)
