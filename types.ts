
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: string;
  date: string; // YYYY-MM-DD
  items: CartItem[];
  total: number;
  cashier: string;
}

export enum View {
  POS = 'POS',
  Inventory = 'Inventory',
  Reports = 'Reports',
  Settings = 'Settings',
}
