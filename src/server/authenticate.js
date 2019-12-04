

import uuid from "uuid";
import md5 from "md5";
import { connectDB } from "./connect-db"
// import { assembleUserState } from "./utility";

const authenticationTokens = [];

async function assembleUserState(user){
    let db = await connectDB(); 

    let tasks = await db.collection(`tasks`).find({owner:user.id}).toArray(); 
    let groups = await db.collection(`groups`).find({owner:user.id}).toArray(); 

    return {
        tasks,
        groups,
        session:{authenticated:`AUTHETICATED`,id:user.id}
    }
}

export const authenticationRoute = app => {
    app.post("/authenticate",async (req,res) => {
        let {username,password} = req.body; 
        let db = await connectDB(); 
        let collection = db.collection(`users`); 
   

        // Checking for the correct username and password. 
        let user = await collection.findOne({name:username}); 

        if(!user){
            return res.status(500).send("User not found."); 
        }; 

        let hash = md5(password); 
        let passwordCorrect = hash == user.passwordHash; 

        if (!passwordCorrect) {
            return res.status(500).send("Dwayne here. Wrong Password; Try Again"); 
        }



        let token  = uuid(); 

        // Tokens aren't used in this course. 
        // However, will be needed for more security in the app. 
        authenticationTokens.push({
            token, 
            userID:user.id
        }); 

        let state = await assembleUserState(user); 

        res.send({token,state}); 

    });
}; 