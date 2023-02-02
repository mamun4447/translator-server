const express=require("express");
const cors = require('cors');
const app=express();
const port=process.env.PORT || 5000;
const bodyParser=require('body-parser');
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(bodyParser());
app.use(cors());
app.use(express.json());

// 7fTWQ9IeTC5GFeA2

const uri =
  "mongodb+srv://secqur:7fTWQ9IeTC5GFeA2@cluster0.c1jtohl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try {
        await client.connect();
        console.log("Connected!!")
    } catch (error) {
        console.log(error);
    }
}run();

const languageCollections = client.db("translator").collection("language");

//===> Get Data <===//
app.get("/languages", async (req, res) => {
  try {
    const language = await languageCollections.find({}).toArray();
    res.send({ data: language });
  } catch (error) {}
});

//===Initial part===//
app.get('/',(req,res)=>{
    res.send("Server is running!!")
})
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})