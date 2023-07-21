import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/connect.js";
import { postRouter } from "./router/post.js";
import { userRouter } from "./router/user.js";

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();
app.use("/auth", userRouter);
app.use("/post", postRouter);

app.listen(port, () => console.log(`Server is listening in ${port} port`));
