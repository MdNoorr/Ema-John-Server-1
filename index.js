const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const app = express();
const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zjved.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

console.log(process.env.DB_USER);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const Collection = client.db("emawatson").collection("john");
  const OrderCollection = client.db("emawatson").collection("orders");
  console.log("Connected");

  //   const product = {name : "Noor", price : 34}
  //   Collection.insertOne(product)
  //     .then(result => {
  //       console.log(3233)
  //     })

  app.post("/addProduct", (req, res) => {
    const products = req.body;
    console.log(products);
    // Collection.insertOne(products).then((result) => {
    //   console.log(result);
    // });
    Collection.insertOne(products).then((result) => {
      console.log(result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });

  app.get("/Products", (req, res) => {
    Collection.find({}).toArray((err, docs) => {
      res.send(docs);
    });
  });

  app.get("/Product/:key", (req, res) => {
    Collection.find({ key: req.params.key }).toArray((err, docs) => {
      res.send(docs[0]);
    });
  });

  app.post("/ProductsByKeys", (req, res) => {
    const productsKeys = req.body;
    Collection.find({ key: { $in: productsKeys } }).toArray((err, docs) => {
      res.send(docs);
    });
  });

  // First Time Create Post Methods
  // app.post("/ Product", (req, res) => {
  //   const products = req.body;
  //   Collection.removeMany(products)
  //     .then((result) => {
  //     console.log(result)
  //   })
  // })

  app.post("/addOrder", (req, res) => {
    const order = req.body;
    console.log(order);
    OrderCollection.insertOne(order).then((result) => {
      console.log(result.insertedCount);
      res.send(result.insertedCount > 0);
    });
  });


});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

app.listen(process.env.PORT || port)
