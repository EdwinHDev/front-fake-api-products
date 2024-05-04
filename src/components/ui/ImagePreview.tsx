import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { CloseIcon } from './Icons'

interface ImagePreviewProps {
  setImages: Dispatch<SetStateAction<File[]>>
  images: File[]
  error?: boolean
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ setImages, error, images }) => {

  const [imagePreviews, setImagePreviews] = useState<{ id: string; src: string }[]>([])
  const [saveFiles, setSaveFiles] = useState<File[]>([])

  useEffect(() => {
    if(!images) setImagePreviews([])
  }, [images])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Update images state
      setImages(acceptedFiles)
      setSaveFiles(acceptedFiles)

      // Generate image previews
      const previews = acceptedFiles.map((file) => ({
        id: uuidv4(),
        src: URL.createObjectURL(file),
      }));
      setImagePreviews(previews)
    },
    [setImages]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': ['.jpg', '.jpeg', '.png'] }, multiple: true, maxFiles: 6 })

  const deleteImage = (index: number) => {

    const updateImagesPreviews = imagePreviews.filter((_image, i) => i !== index)
    setImagePreviews(updateImagesPreviews)

    const updateImagesFile = saveFiles.filter((_file, i) => i !== index)
    setSaveFiles(updateImagesFile)
    setImages(updateImagesFile)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-12">
        <div {...getRootProps()} className={`col-span-12 p-4 border-2 border-dashed ${error ? "border-danger-500" : "border-zinc-300"} rounded-lg`}>
          <input {...getInputProps()} />
          <p className="text-center">Arrastra y suelta imágenes aquí o haz clic para seleccionar imágenes</p>
        </div>
        <div className="col-span-12 grid grid-cols-12 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={preview.id} className="mt-4 col-span-2 w-full aspect-square h-full border-2 border-dashed border-zinc-200 rounded-2xl overflow-hidden relative select-none">
              <CloseIcon
                className='fill-danger-500 hover:fill-danger-400 transition-all active:scale-95 absolute top-2 right-2'
                onClick={() => deleteImage(index)}
              />
              <img src={preview.src} alt="Preview" className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
