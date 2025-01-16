import { Account } from "../../../domain/entities/Account";
import { IAccountRepository } from "../../../application/interfaces/IAccountRepository";
import { AccountModel, IAccountDocument } from "../models/AccountModel";

export class MongoDBAccountRepository implements IAccountRepository {
  async create(account: Account): Promise<Account> {
    const accountDoc = new AccountModel(account);
    const savedAccount = await accountDoc.save();
    return this.toDomain(savedAccount);
  }

  async findById(id: string): Promise<Account | null> {
    const accountDoc = await AccountModel.findById(id).exec();
    return accountDoc ? this.toDomain(accountDoc) : null;
  }

  async findByCustomerId(customerId: string): Promise<Account[]> {
    const accountDocs = await AccountModel.find({ customerId }).exec();
    return accountDocs.map(this.toDomain);
  }

  async updateBalance(id: string, amount: number): Promise<Account | null> {
    const updatedAccount = await AccountModel.findByIdAndUpdate(
      id,
      { balance: amount, updatedAt: new Date() },
      { new: true }
    ).exec();
    return updatedAccount ? this.toDomain(updatedAccount) : null;
  }

  private toDomain(accountDoc: IAccountDocument): Account {
    return new Account(
      accountDoc._id.toString(),
      accountDoc.customerId,
      accountDoc.balance,
      accountDoc.createdAt,
      accountDoc.updatedAt
    );
  }
}
