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

export interface IRating {
  product_id?: string;
  star_1: IRatingStar[];
  star_2: IRatingStar[];
  star_3: IRatingStar[];
  star_4: IRatingStar[];
  star_5: IRatingStar[];
}

export interface ISubCategory {
  name: string;
}

export interface IProduct {
  name: string;
  category: string;
  subCategories: ISubCategory[];
  characteristics: ICharacteristic[];
  condition: IProductCondition;
  description: string;
  freeShipping: boolean;
  images: string[];
  stock: number;
  price: number;
  
  _id?: string;
  companyName?: string;
  discount?: number;
  rating?: IRating;
  status?: IProductStatus;
}