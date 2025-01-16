import { Customer } from "../../../domain/entities/Customer";
import { ICustomerRepository } from "../../../application/interfaces/ICustomerRepository";
import { CustomerModel, ICustomerDocument } from "../models/CustomerModel";

export class MongoDBCustomerRepository implements ICustomerRepository {
  create(customer: Customer): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<Customer | null> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<Customer | null> {
    const customerDoc = await CustomerModel.findById(id).exec();
    if (!customerDoc) return null;

    return this.toDomain(customerDoc);
  }

  private toDomain(customerDoc: ICustomerDocument): Customer {
    return new Customer(
      customerDoc._id.toString(),
      customerDoc.name,
      customerDoc.email,
      customerDoc.createdAt
    );
  }
}
