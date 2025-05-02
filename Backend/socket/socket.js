import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const userSocketMap = {};

const io = new Server(server, {
    cors: {
        origin: "*", // Frontend URL
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Get the receiver's socket ID
export const getRecieverSocketId = (receiverId) => {
    return userSocketMap[receiverId] || null;
};


io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    
    // Store user ID with socket ID
    const userId = socket?.handshake?.query?.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Send online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("callUser", ({ from, to, signal }) => {
        console.log(`Call from ${from} to ${to}`);
        io.to(to).emit("incomingCall", { from, signal });
      });
    
      // 📌 Handle Call Accepted
      socket.on("acceptCall", ({ to, signal }) => {
        io.to(to).emit("callAccepted", signal);
      });
    
      // 📌 Handle ICE Candidates
      socket.on("iceCandidate", ({ to, candidate }) => {
        io.to(to).emit("iceCandidate", candidate);
      });
    
      // 📌 Handle Call End
      socket.on("endCall", ({ to }) => {
        io.to(to).emit("callEnded");
      });
    
    
    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        const userId = Object.keys(userSocketMap).find((key) => userSocketMap[key] === socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
