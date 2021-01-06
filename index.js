const {MongoClient} = require('mongodb'); //import mongoclient
var random = require('random-name') //Library to generate random names to be sent back to the client
const express = require('express');
require('dotenv').config();
const app = express()
const port = process.env.PORT
const uri = process.env.DB_URL;
const cors = require('cors');
app.use(cors({origin: 'http://localhost:8080'}));

const client = new MongoClient(uri);
    try {
        // Connecting to my cluster
        client.connect();
        console.log('CONNECTED')
    } 
    catch (e) {
        console.error(e);
    }

app.use(express.json());

//creates set of random data
app.get('/generate_random_data', (req,res)=>{
    generatedName = random.first()
    generatedLastName = random.last()
    res.json({firstName:generatedName, lastName: generatedLastName ,email: `${generatedName}@gmail.com`}) ;
})

app.post('/saveData',(req,res)=>{
    let QRURL = req.body.QRURL;
    let now = Date()
    client.db("QRScanner").collection("QR_Code_Data").insertOne({
        URL:QRURL,
        date:now 
    }).then((res)=>{
        console.log(res)
        res.sendStatus(200)
    }).catch((er)=>{
        res.send(er)
    })
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})