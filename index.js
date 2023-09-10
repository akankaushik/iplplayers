const express = require('express')
const app = express();
const { MongoClient } = require("mongodb");
const cors = require('cors');


app.use(cors());
app.use(express.static('public'));


const getConnection = async() =>{
    const uri =
    "mongodb+srv://akanshakaushik607:akanmongo56@cluster0.ulijo8p.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    const dbName = "player_db";
    const collectionName = "player_details";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    return collection
};

app.get("/api/v1/playerDetails/",async(req,res)=>{

    const connection = await getConnection();
    const players = await connection.find({});
    const playerDataArray =[];

    await players.forEach((player) =>{
        playerDataArray.push(player);
    });
    console.log(playerDataArray);

    res.status(200).json({
        status : true,
        message: "Request Processed Successfully",
        playerDetails : playerDataArray,

    });

});

app.listen(3000,() =>{
    console.log("listening on port 3000");
});