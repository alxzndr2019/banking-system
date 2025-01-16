export class Account {
  constructor(
    public id: string,
    public customerId: string,
    public balance: number,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
