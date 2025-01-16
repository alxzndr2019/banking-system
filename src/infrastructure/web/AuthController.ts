import { Request, Response } from "express";
import { CreateCustomer } from "../../application/use-cases/Customer/CreateCustomer";

import { MongoDBCustomerRepository } from "../database/repositories/MongoCustomerRepository";

const customerRepository = new MongoDBCustomerRepository();

const CreateCustomerUseCase = new CreateCustomer(customerRepository);

export class AuthController {
  static async createCustomer(req: Request, res: Response) {
    try {
      const customer = await CreateCustomerUseCase.execute(
        req.body.name,
        req.body.email
      );
      res.status(201).json(customer);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
