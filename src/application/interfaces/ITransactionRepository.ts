import { Transaction } from "../../domain/entities/Transaction";

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findByAccountId(accountId: string): Promise<Transaction[]>;
}
