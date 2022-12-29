const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sq1hraq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run() {
    try {

        const medias = client.db("HashBook").collection("medias");
        const users = client.db("HashBook").collection("users")

        app.get('/allmedias', async (req, res) => {
            const query = {};
            const result = await medias.find(query).toArray();
            res.send(result);
        })
        app.post('/allmedias', async (req, res) => {
            const post = req.body;
            const result = await medias.insertOne(post);
            res.send(result);
        })

        app.get('/allmedias/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await medias.find(query).toArray();
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('Server Is Running')
});

app.listen(port, () => {
    console.log(port);
})