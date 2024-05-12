import { API, FileAPI } from "../API/baseAPI"
import { IProduct } from "../interfaces/products"

export const createProduct = async (products: IProduct) => {

  try {
    const { data } = await API.post("/products", products)
    console.log(data)
    return data
  } catch (error: any) {
    throw error.response.data.message
  }
}

export const uploadImages = async (images: File[]) => {

  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  try {
    const { data } = await FileAPI.post("/upload", formData)

    console.log(data)
    return data
  } catch (error: any) {
    console.log(error)
    throw error.response.data.message
  }
}