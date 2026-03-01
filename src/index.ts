import { app } from "./app";
import { env } from "./config/env";
import { connectDb } from "./db/connect";

async function main() {
  await connectDb();
  app.listen(env.PORT, () => {
    console.log(`Backend listening on http://localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

export default app;
