export interface User {
  email: string;
  password: string;
}
export interface menu {
  id: number;
  name: string;
  price: number;
  stock: number;
  availability: string;
  reviews: [];
}
export interface dishInventory {
  id: number;
  name: string;
  price: number;
  stock: number;
  availability: string;
}
export interface addDishItem {
  name: string;
  price: string;
  stock: string;
  availability: string;
}

export interface adminOrder {
  id: number;
  name: string;
  price: number;
  status: string;
  rating: number;
}

export interface reviewMsg {
  rating: number;
  review_comment: string;
}
