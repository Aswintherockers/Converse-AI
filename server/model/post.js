import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: [{ type: String, required: true }],
  reply: [{ type: String, required: true }],
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
