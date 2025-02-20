import {Server} from "socket.io";
import express from "express";
import http from 'http';
const app = express();
const server = http.createServer(app);
const userSocketMap = {};

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",  // Frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    },
})

export const getRecieverSocketId = (receiverId)=>{
    return userSocketMap[receiverId] 
}

io.on('connection',(socket)=>{
    console.log("a user connected",socket.id)
    const userId = socket?.handshake?.query?.userId;
    if(userId !="undefined"){
        userSocketMap[userId] = socket.id;
        }
        // io.emit() is used to send events to all the connected clients
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})
export {app,io,server};