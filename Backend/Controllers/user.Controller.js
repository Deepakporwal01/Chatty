import User from "../Models/User.model.js"; 

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req?.user?._id;
    
    if (!loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    console.log(loggedInUserId, "loggedInUserId in getUsersForSidebar");

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
                                    .select("-password")
                                    .lean();
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error?.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


// export const getSingleUser = async(req,res)=>{
// try{
//    const userId = req.body;
//    const user = await User?.findById(userId);
//     res.status(200).json(user);
// }catch(e){
//   console.log(e);
//   res.json({
//     message:"User does not exist when finding solo ",
//     error:e,
//   })
// }
// }