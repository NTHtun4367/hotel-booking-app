import express, { json } from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect";
import { startApolloServer } from "./apollo/apolloServer";

dotenv.config({ path: "config/.env.local" });

const app = express();

app.use(json());

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await dbConnect();
  await startApolloServer(app);

  app.listen(PORT, () => {
    console.log("Server is running on port =>", PORT);
  });
};

startServer().catch((error) => {
  console.error("Unable to start server:", error);
  process.exit(1);
});
