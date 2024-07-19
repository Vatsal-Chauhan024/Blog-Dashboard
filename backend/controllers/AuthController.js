import User from "../models/userModels.js";
import bcryptjs from "bcryptjs"
import { ErrorHandler } from "../utils/Error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email === "" ||
    password === "" ||
    username === ""
  ) {
   next(ErrorHandler(400, "All Fields are Required!!"))
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
    next(error)
  }
};
