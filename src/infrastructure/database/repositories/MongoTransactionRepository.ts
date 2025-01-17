import { Transaction } from "../../../domain/entities/Transaction";
import { ITransactionRepository } from "../../../application/interfaces/ITransactionRepository";
import {
  TransactionModel,
  ITransactionDocument,
} from "../models/TransactionModel";

export class MongoTransactionRepository implements ITransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionDoc = new TransactionModel(transaction);
    const savedTransaction = await transactionDoc.save();
    return this.toDomain(savedTransaction);
  }

  async findByAccountId(accountId: string): Promise<Transaction[]> {
    const transactionDocs = await TransactionModel.find({ accountId }).exec();
    return transactionDocs.map(this.toDomain);
  }
  async findById(id: string): Promise<Transaction | null> {
    const transactionDoc = await TransactionModel.findById(id).exec();
    if (!transactionDoc) return null;

    return this.toDomain(transactionDoc);
  }

  async disputeTransaction(id: string): Promise<void> {
    await TransactionModel.findByIdAndUpdate(id, { status: "disputed" }).exec();
  }

  private toDomain(transactionDoc: ITransactionDocument): Transaction {
    return new Transaction(
      transactionDoc._id,
      transactionDoc.accountId,
      transactionDoc.amount,
      transactionDoc.type,
      transactionDoc.status,
      transactionDoc.createdAt
    );
  }
}
