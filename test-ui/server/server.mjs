import fs from 'fs';
import cors from 'cors';
import asyncModule from 'async';
import dotenv from 'dotenv';
import express from 'express';
import JSONStream from 'JSONStream';
import mongodb from 'mongodb';
import axios from 'axios'

const server = express();

server.use(express.json());
dotenv.config();




server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

server.use(cors());

server.get('/api', async (req, res) => {

    async function run() {
        try {
               // defining the que 
            const q = asyncModule.queue(async function (task) {
                console.log('executing task:', task.name);
                try {
                    const result = await task.execute();
                   task.callback(null, { msg: 'completed task ' + task.name, data: result });
                } catch (error) {
                    console.error(`error while processing task ${task.name}:`, error);
                    task.callback(error);
                }
            }, 2);

            // define a function that calls the external API and adds a task to the queue
            function addToQueue(taskFn, cb) {
                q.push({
                    name: "calling api",
                    execute: taskFn,
                    callback: cb
                });
            }

            // define a function that makes a call to the external API
            async function taskFn() {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                return response.data
            }

            // define a callback function to be called when a task is completed
            function taskCompletedCallback(error, result) {
                if (error) {
                    console.error('error while processing task:', error);
                } else {
                    console.log('result===> ', result);
                    res.status(200).json({result: result });
                }
            }

            // call the addToQueue function with the task function and callback function
            addToQueue(taskFn, taskCompletedCallback);

            // listen for the 'drain' event to know when all tasks have been completed
            q.drain(function () {
                console.log('all tasks have been completed');
            });










           

        } finally {
            console.log("=====  finally ===> ")
        }
    }
    run().catch(error => {
        res.status(404).json({ err: error.message });
    });
});



server.listen(9000, () => {

    console.log('==  server is running on port 9000 ====');


});
