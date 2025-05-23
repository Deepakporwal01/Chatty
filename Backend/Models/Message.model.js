import mongoose from "mongoose";
const MessageModel = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    senderType: {  
      type: String,
      enum: ['user', 'ai'],
      default: 'user',  
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageModel);
export default Message;
