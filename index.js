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
    const order_user = database.collection("user_order");
    //custom api
    app.get("/tour", async (req, res) => {
      const cursor = tour_service.find({});
      const services = await cursor.toArray();
      res.send(services);
      res.json(services);
    });
    //id parameter api
    app.get("/tour/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await tour_service.findOne(query);
      console.log(result);
      res.send(result);
      res.json(result);
    });
    //id parameter delete
    app.delete("/tour/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await tour_service.deleteOne(query);
      console.log(result);
      res.send(result);
      res.json(result);
    });
    //update api with id
    app.put("/tour/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      console.log("hiited update api");
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateData.name,
          address: updateData.address,
          description: updateData.description,
          price: updateData.price,
          img: updateData.img,
          stay: updateData.stay,
        },
      };
      const result = await tour_service.updateOne(filter, updateDoc, options);
      console.log(result);
      res.send(result);
      res.json(result);
    });
    //post api
    app.post("/tour", async (req, res) => {
      const service = req.body;
      console.log(service);
      const result = await tour_service.insertOne(service);
      res.json(result);
    });
    //user order api
    app.post("/order", async (req, res) => {
      const order = req.body;
      console.log(order);
      console.log("order api hited");
      const result = await order_user.insertOne(order);
      res.json(result);
      res.send("order api hitted");
    });
    //orderapi
    app.get("/order/:email", async (req, res) => {
      const id = req.params.email;
      const query = { _id: ObjectId(id) };
      const result = await tour_service.find(query);
      const services = await cursor.toArray();
      res.send(services);
      res.json(services);
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
