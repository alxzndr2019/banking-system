import { MongoClient, Db, Collection, ServerApiVersion } from "mongodb";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export class DbConnection {
  public db!: Db;

  constructor() {
    client.connect().then(() => {
      this.db = client.db("bank");
    });
  }
}
