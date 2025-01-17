import { IAccountRepository } from "../../interfaces/IAccountRepository";
import { ITransactionRepository } from "../../interfaces/ITransactionRepository";
import { Transaction } from "../../../domain/entities/Transaction";
import logger from "../../../infrastructure/utils/logger";

export class WithdrawFunds {
  constructor(
    private accountRepository: IAccountRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(accountId: string, amount: number): Promise<void> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new Error("Account not found");

    if (account.balance < amount) {
      throw new Error("Insufficient funds");
    }

    await this.accountRepository.updateBalance(
      accountId,
      account.balance - amount
    );

    const transaction = new Transaction(
      crypto.randomUUID(),
      accountId,
      amount,
      "debit",
      "completed",
      new Date()
    );
    await this.transactionRepository.create(transaction);
    //log
    logger.info({
      message: "Transaction completed",
      transactionId: transaction.id,
      accountId: transaction.accountId,
      type: transaction.type,
      amount: transaction.amount,
      timestamp: transaction.createdAt,
    });
  }
}
