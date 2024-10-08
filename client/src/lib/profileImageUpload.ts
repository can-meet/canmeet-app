import axios from 'axios'

export const profileImageUpload = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_PROFILE,
  )
  formData.append('folder', 'profile-images')

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
      return response.data.secure_url
    }
    throw new Error('Error uploading file to Cloudinary')
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error)
    throw error
  }
}
