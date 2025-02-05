import User from "../Models/User.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookies from "../utils/generatejwt.js";
export const signup = async(req, res) => {
  try {
    const { fullName, password, gender, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password does not match " });
    }

    const user = User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
  
    const hashedPassword = await bcrypt.hash(password,10);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = User.create({
      fullName,
      password:hashedPassword,
      gender, 
      profilePic:gender === "male" ? boyProfilePic :girlProfilePic,
    })
    await newUser.save();
    
    if(newUser){
generateTokenAndSetCookies( newUser._id,req);
      res.send({
        fullname :newUser.fullname,
        profilePic:newUser.profilePic,
        gender:newUser.gender,
        _id :newUser._id,
      
      })
    }else{
      throw new Error ("Please Enter Valid Details");
    }


  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: "Something Went wrong ,Please signup again",
      error,
    });
  }
};

export const login = async(req, res) => {
  try {
    const { username, password } = req.body;

    const IsuserExists = await User.findOne({username})
    if(!IsuserExists){
       return res.status(400).json({error:"User Does not exists"});
    }
    const isValidPassword = await bcrypt.compare(password,IsuserExists?.password || "");
    if(!isValidPassword){
      return res.status(400).json({
        error:"Password does not match",
      })

    }
    generateTokenAndSetCookies( IsuserExists._id,req)
    res.status(200).json({
_id : IsuserExists?._id,
fullname: IsuserExists?.fullName,
profilePic: IsuserExists?.profilePic,

    }
  )

  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: "Something Went wrong ,Please login again",
      error,
    });
  }
};

export const logout = async(req, res) => {
  try {
    res.cookie("jwt_token","",{maxAge:0});

  } catch (error) {
    res.json({
      error: true,
      success: false,
      message: "Something Went wrong,Please logout again  ",
      error,
    });
  }
};
