import { Customer } from "../entities/Customer";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ICustomerInteractor } from "../interfaces/ICustormerInteractor";

export class CustomerInteractor implements ICustomerInteractor {
  private repository: ICustomerRepository;
  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async createCustomer(input: any) {
    this.repository.create(input);
  }
  async getCustomer(id: any) {
    this.repository.findById(id);
  }
  async updateCustomer(id: string, data: Customer) {
    this.repository.update(id, data);
  }
  async deleteCustomer(id: any) {
    this.repository.delete(id);
  }
  async getCustomers(limit: number, offset: number) {
    this.repository.find(limit, offset);
  }
}
