import express from "express";
import userModel from "../model/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (user) {
    return res.status(409).json({ message: "User already Exists" });
  }
  const newUser = new userModel({ email, password });
  await newUser.save();
  return res.status(200).json({ message: "User Created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not exists" });
  }
  const isPas = await userModel.findOne({ password: password });
  if (!isPas) {
    return res.status(404).json({ message: "Password is incorrect" });
  }
  res.json({ userID: user._id });
});

export { router as userRouter };
