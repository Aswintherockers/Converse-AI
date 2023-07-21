import express from "express";
import { Configuration, OpenAIApi } from "openai";
import postModel from "../model/post.js";

const router = express.Router();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API,
  })
);

router.post("/", async (req, res) => {
  const { userId, msg } = req.body;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: msg }],
  });
  const reply = response.data.choices[0].message.content;
  try {
    const post = await postModel.findOne({ userId });
    if (post) {
      post.message.push(msg);
      post.reply.push(reply);
      await post.save();
    } else {
      const newPost = postModel({
        userId,
        message: [msg],
        reply: [reply],
      });
      await newPost.save();
    }
    return res.status(200).json({ message: "Reply added" });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await postModel.find({ userId });
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await postModel.findOne({ userId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    await postModel.deleteOne({ userId });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
  }
});


export { router as postRouter };
