const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
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
        //get product api
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
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