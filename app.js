'use strict';

import express from "express";
import postRoute from './router/board.js';
import authRoute from './router/auth.js';
import profileRoute from "./router/profile.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/posts', postRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error, req, res, next) => {
    console.log(error);
    res.sendStatus(500);
});

app.listen(process.env.PORT || 8080, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });