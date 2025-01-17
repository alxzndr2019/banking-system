export class Transaction {
  constructor(
    public id: string,
    public accountId: string,
    public amount: number,
    public type: "credit" | "debit",
    public status: "pending" | "disputed" | "completed",
    public createdAt: Date
  ) {}
}
