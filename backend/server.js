const express = require('express');
const {chats} =  require('./data/data')
const dotenv = require('dotenv');
const connDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes')

const app = express();


dotenv.config();

const port = process.env.PORT;
//data base connection call
connDB();

//since we gonna take data from front end we have to setup a middleware for accepting in json format on our backend
app.use(express.json());


app.get("/", (req, res) => {
    res.send(`<h1 style="font-family: Verdana;">Api is running</h1>`); // used to send html to page or endpoint
});

//.use is used to setup a middleware at the specified endpoint to CRUD  to DB
app.use('/api/user', userRoutes);

//listens to port when server goes online
app.listen(port, console.log(`Server Online on http://localhost:${port}`.yellow.bold));