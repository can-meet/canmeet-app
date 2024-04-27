import axios from "axios";

export const productImagesUpload = async (files: any): Promise<string[]> => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("file", file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  });

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 200) {
      const uploadedImages: string[] = [];
      uploadedImages.push(response.data.secure_url);
      return uploadedImages;
    } else {
      throw new Error('Error uploading file to Cloudinary');
    }
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
}