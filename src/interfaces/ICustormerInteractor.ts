export interface ICustomerInteractor {
  createCustomer(input: any): any;
  getCustomer(id: any): any;
  updateCustomer(id: any, data: any): any;
  deleteCustomer(id: any): any;
  getCustomers(limit: number, offset: number): any;
}
