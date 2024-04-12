import mongoose, { Schema, Types } from 'mongoose';
import { Product } from './productModel';
import { Reply } from './replyModel';


export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  isAdmin: boolean;
  // products: Product[];
  // comments: Comment[];
  // replies: Reply[];
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    products: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product'
    }],
    comments: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Comment'
    }],
    replies: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Reply'
    }],
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', userSchema);

export default User;