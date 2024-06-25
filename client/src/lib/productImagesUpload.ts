import axios from 'axios'

export const productImagesUpload = async (files: any): Promise<string[]> => {
  const uploadedImages: string[] = []

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData()
    formData.append('file', files[i])
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    )

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (response.status === 200) {
        uploadedImages.push(response.data.secure_url)
      } else {
        throw new Error('Error uploading file to Cloudinary')
      }
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error)
      throw error
    }
  }
  return uploadedImages
}
