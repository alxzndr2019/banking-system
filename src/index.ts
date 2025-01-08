import express from "express";
import customerRouter from "./routes/customerRoutes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(customerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
