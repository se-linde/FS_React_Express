import { MongoClient } from "mongodb";
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/myorganizer"; 
let db = null; 

// The function that does the connection magic. 

export async function connectDB() {

    if (db) return db; 

    let client = await MongoClient.connect(url,{ useNewUrlParser: true })
    db = client.db(); 
    console.info("We got the DB: ", db); 
    return db; 
}

// To run the function. Just needed to test the initial db connection.  
// connectDB();