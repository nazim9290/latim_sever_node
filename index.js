const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://ogro9290:3zpc5KYpujeWtMkr@cluster0.eanfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("travel_bd");
    const tour_service = database.collection("tour");
    const username = database.collection("user_name");
    //custom api
    app.get("/tour", async (req, res) => {
      const cursor = tour_service.find({});
      const services = await cursor.toArray();
      res.send(services);
      res.json(services);
    });

    app.get("/home", (req, res) => {
      res.send("mongo connect");
    });

    app.post("/tour", async (req, res) => {
      const service = req.body;
      console.log(service);
      const result = await tour_service.insertOne(service);
      res.json(result);
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

//custom api
app.get("/", (req, res) => {
  res.send("Hell!");
});

//applesten
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
