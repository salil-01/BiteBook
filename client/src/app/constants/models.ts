export interface User {
  email: string;
  password: string;
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
