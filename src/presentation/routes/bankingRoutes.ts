import expres from "express";
import { BankingController } from "../../infrastructure/web/BankingController";

const router = expres.Router();

router.post("/accounts", BankingController.createAccount);
router.post("/accounts/deposit", BankingController.depositFunds);
router.post("/accounts/withdraw", BankingController.withdrawFunds);
router.post("/accounts/transfer", BankingController.transferFunds);

export default router;
