import User from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generatejwt.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, gender, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "password does not match " });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullName,
      password: hashedPassword,
      username,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookies(newUser._id, res);
      return res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: newUser,
      });
    } else {
      return res.status(400).json({ message: "Please enter valid details" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: true,
      success: false,
      message: "Something Went wrong ,Please signup again",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const IsuserExists = await User.findOne({ username });
  
    if (!IsuserExists) {
      return res.status(400).json({ error: "User Does not exist" });
    }
    const isValidPassword = await bcrypt.compare(password, IsuserExists?.password || "");
   console.log("isValidPassword",isValidPassword);
    if (!isValidPassword) {
      throw new Error("Password Does not match");
      return res.status(400).json({ error: "Invalid Password" });
    } 
    console.log("login" );
    generateTokenAndSetCookies(IsuserExists._id, res);
   
    res.status(200).json({
      success: true,
      _id: IsuserExists?._id,
      fullname: IsuserExists?.fullName,
      profilePic: IsuserExists?.profilePic,
    });
    
  } catch (error) {
    res.json({
      error: true,
      success: false,
      message:  error.message || "Something Went wrong ,Please login again",
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clearing the cookie properly
    res.cookie("jwt_token", "", {
      httpOnly: true,  // Ensures the cookie is only accessible via HTTP(S)
      secure: true,    // Ensures it's only sent over HTTPS
      sameSite: "None", // Ensures cross-site requests work if needed
      expires: new Date(0), // Immediately expires the cookie
    });
 
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
 
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: "Something went wrong, please try logging out again",
      error,
    });
  }
};
