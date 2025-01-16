import express from "express";
import { AuthController } from "../../infrastructure/web/AuthController";
const router = express.Router();

router.post("/customers", AuthController.createCustomer);

export default router;
