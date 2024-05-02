import mongoose, { Schema, Types } from "mongoose";
import type { Comment } from "./commentModel";
import type { User } from "./userModel";

export type Product = {
<<<<<<< HEAD
  _id: string;
  product_name: string;
  price: number;
  images: string[];
  product_status: string;
  description: string;
  payment_method: string;
  location: string;
  sale_status: string;
  user: User;
  comments: Comment[];
}

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [{
      type: String,
      required: true,
    }],
    product_status: {
      type: String,
      enum: ["新品、未使用", "未使用に近い", "目立った傷や汚れなし", "やや傷や汚れあり", "傷や汚れあり", "全体的に状態が悪い"],
      required: true,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    payment_method: {
      type: String,
      enum: ["e-transfer", "現金"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    sale_status: {
      type: String,
      enum: ["売り出し中", "取引中", "売り切れ"],
      default: "売り出し中",
      required: true,
    },
    comments: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Comment',
      default: []
    }],
  },
  { timestamps: true }
=======
	_id: string;
	product_name: string;
	price: number;
	image: string;
	product_status: string;
	description: string;
	payment_method: string;
	location: string;
	sale_status: string;
	user: User;
	comments: Comment[];
};

const productSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		product_name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			default:
				"https://cdn.pixabay.com/photo/2023/09/18/22/07/ai-generated-8261525_960_720.png",
			required: true,
		},
		product_status: {
			type: String,
			enum: [
				"新品、未使用",
				"未使用に近い",
				"目立った傷や汚れなし",
				"やや傷や汚れあり",
				"傷や汚れあり",
				"全体的に状態が悪い",
			],
			required: true,
		},
		description: {
			type: String,
			maxLength: 500,
		},
		payment_method: {
			type: String,
			enum: ["e-transfer", "現金"],
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		sale_status: {
			type: String,
			enum: ["売り出し中", "取引中", "売り切れ"],
			default: "売り出し中",
			required: true,
		},
		comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
	},
	{ timestamps: true },
>>>>>>> 6ada94a4533665e864df62e5a17ed7ba30ecd2f7
);

const Product = mongoose.model<Product>("Product", productSchema);

export default Product;
