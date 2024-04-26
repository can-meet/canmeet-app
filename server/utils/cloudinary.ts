import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// module.exports = cloudinary;

export const imageUpload = async (profilePicture: any) => {
  const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
    return_data: true
  });
  return uploadedResponse.secure_url;
}