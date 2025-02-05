import Conversation from "../Models/conversation.model.js";
import express from "express";
import Message from "../Models/Message.model.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

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
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save(); 1 second
    // await newMessage.save(); 2 second
    await Promise.all([conversation.save(), newMessage.save()]); //it runs parallely
    res.status(200).json(newMessage);
  } catch {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user_id;
    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    }).populate("messages");
    res.status(200).json(Conversation.messages);
    if (!conversation) {
      return res.status(400).json([]);
    }
  } catch (error) {
    return res.status(400).json({
      error: "error in fetching the messages",
    });
  }
};
