import { IAccountRepository } from "../../interfaces/IAccountRepository";
import logger from "../../../infrastructure/utils/logger";

export class ViewAccountBalance {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<number> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new Error("Account not found");

    //log
    logger.info({
      message: "Account balance viewed",
      accountId: account.id,
      balance: account.balance,
    });

    return account.balance;
  }
}
