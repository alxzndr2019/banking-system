export class Customer {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public balance: number,
    public readonly customerId: string
  ) {}
}
