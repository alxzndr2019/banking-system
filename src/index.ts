import express from "express";
import bankingRoutes from "./presentation/routes/bankingRoutes";
import authRoutes from "./presentation/routes/authRoutes";

import { connectToDatabase } from "./infrastructure/database/mongoDB";
// import "dotenv/config";

const app = express();
app.use(express.json());
app.use("/api", bankingRoutes);
app.use("/api", authRoutes);

const PORT = 3000;

(async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
