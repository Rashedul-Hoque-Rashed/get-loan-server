const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@getloan.ncizsng.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const loanCollections = client.db('loansDB').collection('loans');
        const newsCollections = client.db('loansDB').collection('newses');
        const blogsCollections = client.db('loansDB').collection('blogs');

        app.get('/loans', async (req, res) => {
            const result = await loanCollections.find().toArray();
            res.send(result)
        })

        app.get('/loans/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await loanCollections.findOne(query);
            res.send(result)
        })

        app.get('/newses', async (req, res) => {
            const result = await newsCollections.find().toArray();
            res.send(result)
        })

        app.get('/news/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await newsCollections.findOne(query);
            res.send(result)
        })

        app.get('blogs', async (req, res) => {
            const result = await blogsCollections.find().toArray();
            res.send(result)
        })

        app.get('/blog/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await blogsCollections.findOne(query);
            res.send(result)
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('get loan is running')
})

app.listen(port, () => {
    console.log(`get loan is running on PORT: ${port}`)
})