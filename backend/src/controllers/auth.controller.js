import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validator from "validator";

export const login = (req, res) => {
  res.send("Login route");
};

export const signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    // Validate if the password is at least 6 characters long
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (username.length < 3 || username.length > 30) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 30 characters long" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message:
          "This Email address is already associated with an existing account. Please try logging in instead.",
      });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email: email,
      username: username,
      password: hashedpassword,
    });

    if (newUser) {
      //generate a jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.send("Logout route");
};
