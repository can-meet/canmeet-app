import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User as UserType }  from '../models/userModel';
import User from '../models/userModel';

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

interface AuthenticatedRequest extends Request {
  user?: UserType;
}

const protectRoute = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error in protectRoute middleware: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default protectRoute;