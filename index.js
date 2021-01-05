// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config()


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swu9d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


// const app = express()

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

// const port = 5000;

// console.log(process.env.DB_NAME);

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
// const productsCollection = client.db("ema").collection("jhon");
//         console.log('conected')

       
//     const product = {name : "Noor", price : 34}
//     productsCollection.insertOne(product)
//         .then(result => {
//         console.log(3233)
//         })
//     app.post('/addProduct', (req, res) => {
//         const products = req.body;
//         productsCollection.insertMany(products)
//         .then(result => {
//             console.log(result.insertedCount);
//             res.send(result.insertedCount)
//         })
//     })

//     // app.post('/add', (req, res) => {
//     //     const pro = req.body
//     //     productsCollection.insertMany(pro)
//     //     .then(result => {
//     //         console.log(result.insertedCount);
//     //         res.send(result.insertedCount)
//     //     })
//     // })
// })

// app.listen(port)

const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const app = express()
const port = 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zjved.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
  const Collection = client.db("ema").collection("jhon");
  console.log("Connected");

//   const product = {name : "Noor", price : 34}
//   Collection.insertOne(product)
//     .then(result => {
//       console.log(3233)
//     })

    app.post('/addProduct', (req, res) => {
                const products = req.body;
                Collection.insertMany(products)
                .then(result => {
                    console.log(result.insertedCount);
                    res.send(result.insertedCount)
                })
            })


});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
