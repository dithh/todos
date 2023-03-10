import express from 'express';
import todos from "./todos/routes"
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config()


const app = express();
mongoose.connect(`${process.env.DATABASE_URL}:${process.env.DATABASE_PORT}/todos`)
    .then(() => console.log('mongo connected'))
    .catch((error) => console.log(error))

app.use(bodyParser.json())

app.use('/api/todos',todos)

export default app;
