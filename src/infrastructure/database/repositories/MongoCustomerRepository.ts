import { Customer } from "../../../domain/entities/Customer";
import { ICustomerRepository } from "../../../application/interfaces/ICustomerRepository";
import { CustomerModel, ICustomerDocument } from "../models/CustomerModel";
import { ObjectId } from "mongodb";
export class MongoDBCustomerRepository implements ICustomerRepository {
  async create(customer: Customer): Promise<Customer> {
    const customerDoc = new CustomerModel({
      id: new ObjectId(customer.id),
      name: customer.name,
      email: customer.email,
      createdAt: customer.createdAt,
    });

    await customerDoc.save();
    return this.toDomain(customerDoc);
  }
  async findByEmail(email: string): Promise<Customer | null> {
    const customerDoc = await CustomerModel.findOne({ email }).exec();
    if (!customerDoc) return null;

    return this.toDomain(customerDoc);
  }
  async findById(id: string): Promise<Customer | null> {
    const customerDoc = await CustomerModel.findById(id).exec();
    if (!customerDoc) return null;

    return this.toDomain(customerDoc);
  }

  private toDomain(customerDoc: ICustomerDocument): Customer {
    return new Customer(
      customerDoc._id,
      customerDoc.name,
      customerDoc.email,
      customerDoc.createdAt
    );
  }
}
