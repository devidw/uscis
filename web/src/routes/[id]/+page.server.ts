import type { PageServerLoad } from "./$types.js"
import { check } from "shared/dist/checker.js"
import { db } from "db/dist/db.js"
import * as schema from "db/dist/schema.js"
import { eq } from "drizzle-orm"

export const load: PageServerLoad = async ({ params }) => {
  const deets = await check(params.id)

  await db
    .insert(schema.cases)
    .values({
      id: params.id,
      last_check: new Date().toISOString(),
      last_status: deets.actionCodeText,
    })
    .onConflictDoNothing()

  const ourRec = await db
    .select()
    .from(schema.cases)
    .where(eq(schema.cases.id, params.id))

  return {
    id: params.id,
    deets,
    email: ourRec[0].email,
  }
}
