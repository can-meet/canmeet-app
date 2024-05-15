"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const signup = async (req, res) => {
    const { username, email, password, profilePicture } = req.body;
    try {
        const userExists = await userModel_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            username,
            email,
            password: hashedPassword,
            profilePicture: profilePicture
        });
        if (newUser) {
            // create jwt token
            (0, generateToken_1.default)(newUser._id, res);
            await newUser.save();
            res.status(201).json(newUser);
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "Authentication failed" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Authentication failed" });
        }
        (0, generateToken_1.default)(user._id, res);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.login = login;
