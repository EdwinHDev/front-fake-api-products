"use client";

import { AddImageIcon } from "./Icons";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";

interface Props {
  title?: string;
  subTitle?: string;
  setImagesData?: Dispatch<SetStateAction<string[]>>;
  imagesData?: string[];
  isBordered?: boolean;
  borderedStyle?: "normal" | "dashed";
  color?: "slate" | "indigo";
  size?: number;
  defaultValue?: string[];
  quality?: number;
}

export const ImageViewer = ({ title = "", subTitle = "", setImagesData, imagesData, isBordered, borderedStyle = "normal", color = "slate", size = 500, defaultValue = "", quality = 75 }: Props) => {

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  let colorSelected = "";
  let borderedStyleSelected = "";

  if(color === "indigo") {
    colorSelected = "outline-indigo-300";
  }

  if(color === "slate") {
    colorSelected = "outline-slate-300";
  }

  if(borderedStyle === "normal") {
    borderedStyleSelected = "outline";
  }

  if(borderedStyle === "dashed") {
    borderedStyleSelected = "outline-dashed";
  }

  const [image, setImage] = useState(defaultValue);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const images_file = e.target.files;

    if(!images_file) return;

    Array.prototype.forEach.call(images_file, function(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const image_url = event.target?.result;

        const temp_image = document.createElement("img");
        temp_image.src = image_url as string;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        temp_image.onload = (e: any) => {
          const canvas = document.createElement("canvas");
          const ratio = size / e.target.width;
          canvas.width = size;
          canvas.height = e.target.height * ratio;

          const context = canvas.getContext("2d");
          context?.drawImage(temp_image, 0, 0, canvas.width, canvas.height);

          const new_image_url = context?.canvas.toDataURL("image/jpeg", quality);
          setImage([...defaultValue, new_image_url!]);

          // Actualiza el setter que le pasen al componente
          if (setImagesData) {
            setImagesData([...imagesData, new_image_url!]);
          }
        }
      }
    });
  };

  const handleImageSelect = () => {
    inputFileRef.current?.click();
  };

  return (
    <div className="w-40 flex flex-col justify-center items-center">
      <input
        ref={ inputFileRef }
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleChangeImage}
        className="hidden"
        multiple
      />
      <div
        className={`max-w-40 min-w-40 max-h-40 min-h-40 bg-white rounded-2xl mb-4 cursor-pointer overflow-hidden ${ isBordered && `${borderedStyleSelected} outline-2 outline-offset-2 ${ colorSelected }` }`}
        onClick={handleImageSelect}
      >
        {
          image ? (
            <img src={image} alt={title ? title : "image preview"} className="w-full h-full object-cover" />
          ) : (
            <div className="w-40 h-40 flex justify-center items-center bg-slate-50">
              <AddImageIcon className="w-16 h-16 fill-slate-300" />
            </div>
          )
        }
      </div>
      {
        title !== "" && <label className="text-slate-800 font-medium after:content-['*'] after:ml-0.5 after:text-danger-500 mb-2">{ title }</label>
      }
      {
        subTitle !== "" && <p className="text-xs text-zinc-400 max-w-80 text-center">{ subTitle }</p>
      }
    </div>
  )
}
