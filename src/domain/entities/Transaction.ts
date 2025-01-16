export class Transaction {
  constructor(
    public id: string,
    public accountId: string,
    public type: "credit" | "debit",
    public amount: number,
    public createdAt: Date
  ) {}
}
