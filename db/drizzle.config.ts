import { defineConfig } from "drizzle-kit"
import { config } from "dotenv"

if (process.env.USER === "devidw") {
  config({
    path: new URL("../../.env", import.meta.url),
  })
}

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
})
