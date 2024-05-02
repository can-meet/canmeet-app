import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute";
import commentRoutes from "./routes/commentRoute";
import messageRoutes from "./routes/messageRoute";
import productRoutes from "./routes/productRoute";
import replyRoutes from "./routes/replyRoute";
import userRoutes from "./routes/userRoute";

dotenv.config();

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app: express.Express = express();
const mongoURI = process.env.MONGODB_URI as string;
const port = process.env.PORT;

mongoose
	.connect(mongoURI)
	.then(() => {
		console.log("MongoDB is connected");
	})
	.catch((err) => {
		console.log(err);
	});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:5173",
	}),
);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/replies', replyRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("Hello, world!");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
