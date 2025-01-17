import User from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import { ErrorHandler } from "../utils/Error.js";
import jwt from "jsonwebtoken";

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
    next(ErrorHandler(400, "All Fields are Required!!"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUSer = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUSer.save();
    res.json({ message: "Signup Successful" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(ErrorHandler(400, "Fields are empty"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(ErrorHandler(404, "Invalid Credentials"));
    }
    const ValidPassword = bcryptjs.compareSync(password, validUser.password);

    if (!ValidPassword) {
      return next(ErrorHandler(400, "Invalid Credentials"));
    }

    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
import dotenv from "dotenv";

dotenv.config();

export const google = async (req, res, next) => {
  const { email, name, googlePhotUrl } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

        const newUser = new User({
          username: name.toLowerCase().split("").join("") + Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotUrl
        })
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
