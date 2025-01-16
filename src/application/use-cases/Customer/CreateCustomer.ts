import { Customer } from "../../../domain/entities/Customer";
import { ICustomerRepository } from "../../../application/interfaces/ICustomerRepository";
import mongoose from "mongoose";

export class CreateCustomer {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(name: string, email: string): Promise<Customer> {
    // Check if the customer already exists
    const existingCustomer = await this.customerRepository.findByEmail(email);
    if (existingCustomer) {
      throw new Error("Customer already exists");
    }

    // Create a new customer
    const newCustomer = new Customer(
      new mongoose.Types.ObjectId(),
      name,
      email,
      new Date()
    );

    return this.customerRepository.create(newCustomer);
  }
}
