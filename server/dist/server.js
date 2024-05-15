"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const replyRoute_1 = __importDefault(require("./routes/replyRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const roomRoute_1 = __importDefault(require("./routes/roomRoute"));
const notificationRoute_1 = __importDefault(require("./routes/notificationRoute"));
const socket_1 = require("./socket/socket");
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT;
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("MongoDB is connected");
})
    .catch((err) => {
    console.log(err);
});
// middleware
socket_1.app.use(express_1.default.json());
socket_1.app.use(express_1.default.urlencoded({ extended: true }));
socket_1.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
socket_1.app.use('/api/auth', authRoute_1.default);
socket_1.app.use('/api/products', productRoute_1.default);
socket_1.app.use('/api/comments', commentRoute_1.default);
socket_1.app.use('/api/replies', replyRoute_1.default);
socket_1.app.use("/api/users", userRoute_1.default);
socket_1.app.use("/api/rooms", roomRoute_1.default);
socket_1.app.use("/api/notifications", notificationRoute_1.default);
socket_1.app.get("/", (req, res) => {
    res.send("Hello, world!");
});
socket_1.server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
