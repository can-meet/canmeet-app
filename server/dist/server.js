"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT;
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log('MongoDB is connected');
})
    .catch((err) => {
    console.log(err);
});
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
