import User from "../models/userModels.js";
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email === "" ||
    password === "" ||
    username === ""
  ) {
    return res.status(400).json({ message: "All Fields are Required!!" });
  }

  const hashPassword = bcryptjs.hashSync(password, 10);


  const newUSer = new User({
    username,
    email,
    password:hashPassword,
  });

  try {
    await newUSer.save();
    res.json({ message: "Signup Successful" });
  } catch (error) {
    res.status(500).json({ message: error.errmsg });
  }
};
