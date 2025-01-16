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

  private toDomain(transactionDoc: ITransactionDocument): Transaction {
    return new Transaction(
      transactionDoc._id.toString(),
      transactionDoc.accountId,
      transactionDoc.type,
      transactionDoc.amount,
      transactionDoc.createdAt
    );
  }
}
