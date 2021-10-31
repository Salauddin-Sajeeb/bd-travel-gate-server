const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d0ttl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)

async function run() {
    try {

        await client.connect();
        const database = client.db('tourism');
        const packageCollection = database.collection('packages');
        const orderCollection = database.collection('Orders');
        //get product api
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })
        //add orders
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result)
        })
        //get order
        app.get('/orders', async (req, res) => {
            const cursor = orderCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })
        //delete
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(query);
            res.json(result)
        })

        //post to database
        app.post('/packages', async (req, res) => {

            const package = req.body;
            console.log('hit the api', package)
            const result = await packageCollection.insertOne(package);
            res.json(result)
        })


    }
    finally {

    }

}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('running')
    console.log('running')
})

app.listen(port, () => {
    console.log('server is running')
})