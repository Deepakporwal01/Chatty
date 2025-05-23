import Group from "../Models/Group.model.js";
import Message from "../Models/Message.model.js";
export const createGroup = async (req, res) => {
  const { name, members } = req.body;
  const userId = req.user?._id; // From auth middleware
  try {
    const group = await Group.create({
      name,
      members: [userId, ...members],
      createdBy: userId,
    });
    res.status(201).json({ message: "group created successfully ", group });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Assuming you're using some kind of auth middleware that sets req.user._id
export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user._id; // Replace this with your actual user ID logic
    const groups = await Group.find({ members: userId }).populate(
      "members",
      "fullName"
    );
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user groups" });
  }
};

export const getGroupMessages  = async(req,res)=>{
    const {groupId} = req.params;
    try{
 const messages = await Message.find({groupId}).populate("senderId",fullName)
res.status(200).json(messages);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch group messages"})
    }
}
export const leaveGroup = async (req, res) => {

  try{

    const { groupId } = req.params;
    const userId = req.user._id; // Assuming you have the user ID from the request

    // Find the group and remove the user from its members
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: userId } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json({ message: "Successfully left the group", group });
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Failed to leave group"})
  
}
}
