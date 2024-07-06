import * as schema from "db/dist/schema.js"
import { db } from "db/dist/db.js"
import type { RequestHandler } from "./$types.js"
import { eq } from "drizzle-orm"

export const GET: RequestHandler = async function GET({ url }) {
  try {
    await db
      .update(schema.cases)
      .set({ email: url.searchParams.get("email") })
      .where(eq(schema.cases.id, url.searchParams.get("id")!))
    return new Response(null, { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify(e, null, 4), { status: 500 })
  }
}
