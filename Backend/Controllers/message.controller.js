import Conversation from "../Models/conversation.model.js";
import Message from "../Models/Message.model.js";
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let aiResponse = null;
    if (message.startsWith("@ai")) {
      const aiMessage = message.replace("@ai", "").trim();

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: aiMessage, // ✅ Pass simple string directly
      });

      aiResponse = result.text; // ✅ response.text contains output
      console.log("AI Response:", aiResponse);
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message: aiResponse || message,
      senderType: aiResponse ? "ai" : "user",
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    const receiverSocketId = getRecieverSocketId(receiverId);
    const senderSocketId = getRecieverSocketId(senderId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json({
      success: true,
      data: aiResponse || message,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find the conversation
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages").populate("participants");

    // If conversation not found
    if (!conversation) {
      return res.status(400).json({
        data: [],
        success: false,
        message: "No conversation found between the users",
      });
    }

    // Find sender and receiver information
    const sender = conversation.participants.find(
      (p) => p._id.toString() === senderId.toString()
    );
    const receiver = conversation.participants.find(
      (p) => p._id.toString() === receiverId.toString()
    );

    // If sender or receiver not found in participants
    if (!sender || !receiver) {
      return res.status(400).json({
        data: [],
        success: false,
        message: "Sender or receiver not found in conversation",
      });
    }

    // Return conversation, sender, receiver
    res.status(200).json({
      data: { conversation: { ...conversation.toObject(), messages: conversation.messages } },
      sender,
      receiver,
      success: true,
    });
  } catch (error) {
    console.log("Error in getMessages:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
