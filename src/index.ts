import { app } from "./app";
import { env } from "./config/env";
import { connectDb } from "./db/connect";

// Connect to DB on startup (for local development)
if (env.NODE_ENV !== "production") {
  connectDb().catch((err) => {
    console.error("Database connection failed:", err);
    process.exitCode = 1;
  });

  app.listen(env.PORT, () => {
    console.log(`Backend listening on http://localhost:${env.PORT}`);
  });
}

export default app;
