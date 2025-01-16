import express from "express";
import bankingRoutes from "./presentation/routes/bankingRoutes";

import { connectToDatabase } from "./infrastructure/database/mongoDB";
// import "dotenv/config";

const app = express();
app.use(express.json());
app.use("/api", bankingRoutes);

const PORT = 3000;

(async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
