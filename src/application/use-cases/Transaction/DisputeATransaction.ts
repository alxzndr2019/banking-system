import { ITransactionRepository } from "../../interfaces/ITransactionRepository";
import { Transaction } from "../../../domain/entities/Transaction";
import logger from "../../../infrastructure/utils/logger";

export class DisputeATransaction {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(transactionId: string): Promise<void> {
    const transaction = await this.transactionRepository.findById(
      transactionId
    );
    if (!transaction) throw new Error("Transaction not found");

    if (transaction.status !== "completed") {
      throw new Error("Transaction is not completed");
    }

    await this.transactionRepository.disputeTransaction(transactionId);
    //log
    logger.info({
      message: "Transaction disputed successfully",
      transactionId: transaction.id,
      accountId: transaction.accountId,
      type: transaction.type,
      amount: transaction.amount,
      timestamp: transaction.createdAt,
    });
  }
}
