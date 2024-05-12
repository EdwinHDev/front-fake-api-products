export type IProductStatus = "publicado" | "pendiente" | "agotado" | "bloqueado";
export type IProductCondition = "nuevo" | "usado";

export interface ICharacteristic {
  id?: string;
  name: string;
  value: string;
}

export interface ICLient {
  _id: string;
  name: string;
}

export interface IRatingStar {
  client: ICLient;
  conment: string;
  date: string;
}

export interface IImages {
  original: string;
  small: string;
  medium: string;
  large: string;
}

export interface IRating {
  product_id?: string;
  star_1: IRatingStar[];
  star_2: IRatingStar[];
  star_3: IRatingStar[];
  star_4: IRatingStar[];
  star_5: IRatingStar[];
}

export interface IProduct {
  name: string;
  description: string;
  category: string;
  subCategories: string;
  characteristics: ICharacteristic[];
  condition: IProductCondition;
  stock: number;
  price: number;
  discount?: number;
  companyName?: string;
  status?: string;

  images: IImages[];
  _id?: string;
  
  rating?: IRating;
  freeShipping: boolean;
}