import { NextFunction, Request, Response } from "express";
import { ICustomerInteractor } from "../interfaces/ICustormerInteractor";

export class CustomerController {
  private interactor: ICustomerInteractor;
  constructor(interactor: ICustomerInteractor) {
    this.interactor = interactor;
  }
  async onCreateCustomer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await this.interactor.createCustomer(req.body);
      return res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }
  async onGetCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.interactor.getCustomer(req.params.id);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async onUpdateCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.interactor.updateCustomer(
        req.params.id,
        req.body
      );
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async onDeleteCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.interactor.deleteCustomer(req.params.id);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  async onGetCustomers(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset
        ? parseInt(req.query.offset as string)
        : 0;
      const data = await this.interactor.getCustomers(limit, offset);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
}
