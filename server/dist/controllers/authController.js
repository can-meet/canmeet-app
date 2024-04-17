"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await userModel_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = new userModel_1.default({
            username,
            email,
            password: hashedPassword
        });
        const result = await user.save();
        res.status(201).send({ message: 'User created', userId: result._id });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Authentication failed' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Authentication failed' });
        }
        // create jwt token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token, userId: user._id });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.signin = signin;
