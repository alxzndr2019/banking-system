import { Request, Response } from "express";
import { CreateAccount } from "../../application/use-cases/Account/CreateAccount";
import { DepositFunds } from "../../application/use-cases/Account/DepositFunds";
import { WithdrawFunds } from "../../application/use-cases/Account/WithdrawFunds";
import { TransferFunds } from "../../application/use-cases/Account/TransferFunds";
import { ViewAccountBalance } from "../../application/use-cases/Account/ViewAccountBalance";
import { MongoDBAccountRepository } from "../database/repositories/MongoAccountRepository";
import { MongoDBCustomerRepository } from "../database/repositories/MongoCustomerRepository";
import { MongoTransactionRepository } from "../database/repositories/MongoTransactionRepository";
import { DisputeATransaction } from "../../application/use-cases/Transaction/DisputeATransaction";
const transactionRepository = new MongoTransactionRepository();
const accountRepository = new MongoDBAccountRepository();
const customerRepository = new MongoDBCustomerRepository();
const createAccountUseCase = new CreateAccount(
  accountRepository,
  customerRepository
);
const depositFundsUseCase = new DepositFunds(
  accountRepository,
  transactionRepository
);

export class BankingController {
  static async createAccount(req: Request, res: Response) {
    try {
      const account = await createAccountUseCase.execute(req.body.customerId);
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async depositFunds(req: Request, res: Response) {
    try {
      await depositFundsUseCase.execute(req.body.accountId, req.body.amount);
      res.status(200).send("Deposit successful");
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async withdrawFunds(req: Request, res: Response) {
    try {
      const withdrawFundsUseCase = new WithdrawFunds(
        accountRepository,
        transactionRepository
      );
      await withdrawFundsUseCase.execute(req.body.accountId, req.body.amount);
      res.status(200).send("Withdrawal successful");
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async transferFunds(req: Request, res: Response) {
    try {
      const transferFundsUseCase = new TransferFunds(
        accountRepository,
        transactionRepository
      );
      await transferFundsUseCase.execute(
        req.body.sourceAccountId,
        req.body.destinationAccountId,
        req.body.amount
      );
      res.status(200).send("Transfer successful");
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async viewAccountBalance(req: Request, res: Response) {
    try {
      const viewAccountBalanceUseCase = new ViewAccountBalance(
        accountRepository
      );
      const balance = await viewAccountBalanceUseCase.execute(
        req.params.accountId
      );
      res.status(200).json({ balance });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  static async disputeATransaction(req: Request, res: Response) {
    try {
      const disputeATransactionUseCase = new DisputeATransaction(
        transactionRepository
      );
      await disputeATransactionUseCase.execute(req.params.transactionId);
      res.status(200).send("Transaction disputed");
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
