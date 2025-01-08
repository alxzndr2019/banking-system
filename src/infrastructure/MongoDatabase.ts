import { MongoClient, Db, Collection, Document } from "mongodb";
import { IMongoDatabase } from "../interfaces/IMongoDatabase";
export class MongoDatabase<T extends Document> implements IMongoDatabase<T> {
  private client: MongoClient;
  private db?: Db;
  private readonly uri: string;
  private readonly dbName: string;

  constructor(uri: string, dbName: string) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }

  async connect(): Promise<void> {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  async getCollection(name: string): Promise<Collection<T>> {
    if (!this.db) {
      await this.connect();
    }
    if (!this.db) {
      throw new Error("Database not initialized");
    }
    return this.db.collection<T>(name);
  }
}
