const express = require('express');
const app = express();
const {chats} =  require('./data/data')
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Api is running");
});
app.get("/api/chat", (req, res) => {
    res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
    res.send(chats.find(c => c.id === req.params.id));
    
});
app.listen(port, console.log(`Server Online on ${port}`));