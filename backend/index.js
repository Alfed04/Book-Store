import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import {PORT , mongoDBURL} from './config.js'
import booksRoute from './routes/bookRoutes.js';

//middleware to parse the json body
app.use(express.json())

//Handling the Cross Origin Resource Sharing (cors) Policy
app.use(cors())

app.get("/",(req,res)=>{
    console.log("Getting requests at the slash or / endpoint");
    return res.status(234).send("Everything is okay");
})

app.use("/books",booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("Connected to the Database Successfully");
        app.listen(PORT,()=>{
            console.log("App is listening to the requests coming at port number "+ PORT)
        })
    }).catch((error)=>{
        console.log("Error while connecting to the Database | Error = " + error);
    })
