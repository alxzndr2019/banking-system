import { Account } from "../../domain/entities/Account";

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
  findById(id: string): Promise<Account | null>;
  findByCustomerId(customerId: string): Promise<Account[]>;
  updateBalance(id: string, amount: number): Promise<Account | null>;
}
