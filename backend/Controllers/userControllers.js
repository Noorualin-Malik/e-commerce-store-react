import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 

// Login Function
export const loginFunc = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ msg: "Invalid login credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid login credentials" });
    }

    const token = jwt.sign(
      { _id: findUser._id, email: findUser.email },
      "123456", // Hardcoded secret
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { maxAge: 8 * 60 * 60 * 1000, httpOnly: true });
    res.cookie("user", findUser.email, { maxAge: 8 * 60 * 60 * 1000, httpOnly: false }); 
    res.cookie("role", findUser.role, { maxAge: 8 * 60 * 60 * 1000, httpOnly: false });

    return res.json({
      login: true,
      token,
      msg: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

// Signup Function
export const signup = async (req, res) => {
  try {
    const data = req.body;

    const findUser = await User.findOne({ email: data.email });
    if (findUser) {
      return res.status(400).json({ msg: "Account Already Exist" });
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    data.password = hashPassword;
    data.role = "user";

    console.log("Signup data received:", data);

    const newUser = await User.create(data);
    await newUser.save();

    return res.json({ msg: "Account Created" });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};

// Get All Users
export const getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    return res.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};
