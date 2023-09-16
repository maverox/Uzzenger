const express = require('express');
const dotenv = require('dotenv');
const connDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const path = require('path');

dotenv.config();

const port = process.env.PORT || 8080;
//data base connection call
connDB();

//since we gonna take data from front end we have to setup a middleware for accepting in json format on our backend
app.use(express.json());




//.use is used to setup a middleware at the specified endpoint to CRUD  to DB
app.use('/api/user', userRoutes);

//chat route
app.use('/api/chat', chatRoutes)

//message route 
app.use('/api/message', messageRoutes);

//---------------------------------------------------Deployment--------------------------------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'));
    }); // used to send html to page or endpoint
} else {
    app.get("/", (req, res) => {
    res.send(`<h1 style="font-family: Verdana;">Api is running</h1>`); // used to send html to page or endpoint
});
}
//---------------------------------------------------Deployment--------------------------------------------------------
// api error handlers
app.use(notFound);
app.use(errorHandler);


//listens to port when server goes online
const server = app.listen(port, console.log(`Server Online on http://localhost:${port}`.yellow.bold));
// assigned to a variable server so as to pass it to socket for http protocol duplex connection

//socket connection
const io = require('socket.io')(server, {
    cors: {
        pingTimeout: 60000,
        origin: 'http://localhost:3000',
    }
});

io.on('connection', (socket) => {
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    })
    // client side socket.emit('join chat', chatId) to join a chat room on the server side 

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined the room ' + room);
    })
    //typing event
    socket.on('typing', (room) => {
        socket.in(room).emit('typing');
    })
    //stop typing event
    socket.on('stop typing', (room) => {
        socket.in(room).emit('stop typing');
    })
    // send message to the chat room
    socket.on('new message', (newMessageRecieved) => {
        
        if (!newMessageRecieved.chat.users) return console.log('Chat.users not defined');
        newMessageRecieved.chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit('message recieved', newMessageRecieved);
            
        })
    })
    socket.off('setup', () => {
        console.log('disconnected from socket')
        socket.leave(userData._id);
    })
});

//can i write the  code on line 32, 33 like this
// app.use(notFound, errorHandler)? to be checked in future corrently i dont wanna mess up the code