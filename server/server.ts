import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import authRoutes from "./routes/authRoute";
import commentRoutes from "./routes/commentRoute";
import productRoutes from "./routes/productRoute";
import replyRoutes from "./routes/replyRoute";
import userRoutes from "./routes/userRoute";
import roomRoutes from "./routes/roomRoute";
import notificationRoutes from "./routes/notificationRoute";
import { app, server } from "./socket/socket";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/replies', replyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req: express.Request, res: express.Response) => {
	res.send("Hello, world!");
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
