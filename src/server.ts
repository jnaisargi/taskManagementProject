import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {login} from './controllers/loginController'
import {signup} from './controllers/signupController'
import { connectToDB } from './utils/mongodb';
import {validateJwtToken} from './utils/jwtTokenUtil'
import * as taskController from './controllers/taskController';

dotenv.config();

let PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/signup', signup);
app.post("/login", login);
app.post("/createTask", validateJwtToken, taskController.createTask);
app.get("/findByPriority/:username/:priority", validateJwtToken, taskController.findByPriority);
app.get("/findAll/:username", validateJwtToken, taskController.findAll);
app.put("/updateTask", validateJwtToken, taskController.updateTask);
app.delete("/deleteTask/:username/:taskId", validateJwtToken, taskController.deleteTask);

app.listen(PORT, () => {
    connectToDB();
    console.log('Listening to port', PORT);
});
