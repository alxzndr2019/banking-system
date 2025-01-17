import { IAccountRepository } from "../../interfaces/IAccountRepository";
import { ITransactionRepository } from "../../interfaces/ITransactionRepository";
import { Transaction } from "../../../domain/entities/Transaction";
import logger from "../../../infrastructure/utils/logger";

export class TransferFunds {
  constructor(
    private accountRepository: IAccountRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(
    sourceAccountId: string,
    destinationAccountId: string,
    amount: number
  ): Promise<void> {
    const sourceAccount = await this.accountRepository.findById(
      sourceAccountId
    );
    if (!sourceAccount) throw new Error("Source account not found");

    const destinationAccount = await this.accountRepository.findById(
      destinationAccountId
    );
    if (!destinationAccount) throw new Error("Destination account not found");

    if (sourceAccount.balance < amount) {
      throw new Error("Insufficient funds");
    }

    await this.accountRepository.updateBalance(
      sourceAccountId,
      sourceAccount.balance - amount
    );

    await this.accountRepository.updateBalance(
      destinationAccountId,
      destinationAccount.balance + amount
    );

    const transaction = new Transaction(
      crypto.randomUUID(),
      sourceAccountId,
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

    const transaction2 = new Transaction(
      crypto.randomUUID(),
      destinationAccountId,
      amount,
      "credit",
      "completed",
      new Date()
    );

    await this.transactionRepository.create(transaction2);
    //log
    logger.info({
      message: "Transaction completed",
      transactionId: transaction2.id,
      accountId: transaction2.accountId,
      type: transaction2.type,
      amount: transaction2.amount,
      timestamp: transaction2.createdAt,
    });
  }
}

//TODO: Make Atomic
