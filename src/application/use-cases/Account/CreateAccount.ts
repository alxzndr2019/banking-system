import { Account } from "../../../domain/entities/Account";
import { ICustomerRepository } from "../../interfaces/ICustomerRepository";
import { IAccountRepository } from "../../interfaces/IAccountRepository";

export class CreateAccount {
  constructor(
    private accountRepository: IAccountRepository,
    private customerRepository: ICustomerRepository
  ) {}

  async execute(customerId: string): Promise<Account> {
    // Validate the customer exists
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    // Create a new account linked to the customer
    const newAccount = new Account(
      crypto.randomUUID(),
      customerId,
      0, // Initial balance
      new Date(),
      new Date()
    );

    return this.accountRepository.create(newAccount);
  }
}
