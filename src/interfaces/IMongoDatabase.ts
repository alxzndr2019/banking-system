import { Collection, Document } from "mongodb";

export interface IDatabase<T extends Document> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getCollection(name: string): Promise<Collection<T>>;
}
