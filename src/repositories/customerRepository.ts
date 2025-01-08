import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { Customer } from "../entities/Customer";

export class CustomerRepository implements ICustomerRepository {
  async create(data: Customer): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, data: Customer): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  async find(limit: number, offset: number): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
}
