import { Customer } from "../entities/Customer";

export interface ICustomerRepository {
  create(data: Customer): Promise<Customer>;
  update(id: string, data: Customer): Promise<Customer>;
  find(limit: number, offset: number): Promise<Customer[]>;
  delete(id: string): Promise<Customer>;
  findById(id: string): Promise<Customer>;
}
