/* eslint-disable no-console */
import express from "express"; 
import cors from "cors"; 
import bodyParser from "body-parser"; 
import { connectDB } from "./connect-db"; 
import "./initialize-db"; 
import { authenticationRoute } from './authenticate'; 

let port = 2112;

// New instance of Express. 
let app = express(); 

app.listen(port,console.log("Server is listening on port: ", port)); 

// Test Express connection get request. Works! 
/* app.get("/", (req,res)=>{
	res.send("Test Msg -written by Dwayne- from server.js!!");
}); */ 

// This will be an application plugin. 
app.use(
	cors(), 
	bodyParser.urlencoded({extended:true}),
	bodyParser.json()
); 

authenticationRoute(app); 



// Separate method with a task, that communicates with the db. 
export const addNewTask = async task=>{
    let db = await connectDB(); 
    let collection = db.collection(`tasks`);     
    await collection.insertOne(task); 
}; 

// Update an existing task. 
export const updateTask = async task=>{
    let { id, group, isComplete, name} = task; 
    let db = await connectDB(); 
    let collection = db.collection(`tasks`); 

    if (group) {
        await collection.updateOne({id},{$set:{group}})
    }

    if (name) {
        await collection.updateOne({id},{$set:{name}})
    }

    if (isComplete !== undefined) {
        await collection.updateOne({id},{$set:{isComplete}})
    }

}; 

// NO ERROR HANDLING I should write that. 

// Route for adding new tasks. 
app.post('/task/new', async (req,res)=>{
    let task = req.body.task; 
    await addNewTask(task); 
    res.status(200).send() // 200 means 'OK'. 
}); 

// Route for updating current tasks. 
app.post('/task/update', async (req,res)=>{
    let task = req.body.task; 
    await updateTask(task); 
    res.status(200).send() // 200 means 'OK'. 
}); 

