import mongoose from 'mongoose'
import { ProductType } from './productModel'

export type UserType = {
  _id: string
  username: string
  email: string
  password: string
  profilePicture: string
  isAdmin: boolean
  postedProducts: ProductType[]
  purchasedProducts: ProductType[]
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
    postedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    purchasedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true },
)

const User = mongoose.model<UserType>('User', userSchema)

export default User
