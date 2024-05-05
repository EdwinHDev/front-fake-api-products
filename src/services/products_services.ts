import { IProduct } from "../interfaces/products"

export const createProduct = async (data: IProduct) => {
  try {
    const res = await fetch("https://fake-api-products-sigma.vercel.app/api/products", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const registered = await res.json()
    console.log(registered)
    return registered
  } catch (error) {
    console.log(error)
  }
}

export const uploadImages = async (images: File[]) => {

  const formData = new FormData();
  images.forEach((file, index) => {
    formData.append(`file${index}`, file);
  });

  try {
    const res = await fetch("https://fake-api-products-sigma.vercel.app/api/upload", {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
    const imagesUrl = await res.json()
    return imagesUrl
  } catch (error) {
    console.log(error)
  }
}