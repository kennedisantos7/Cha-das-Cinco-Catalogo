export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  unit: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Preparando' | 'Entregue' | 'Cancelado';
  total: number;
  items: string[]; // Simplified for display
  image: string; // Thumbnail
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'Ativo' | 'Inativo';
  ordersCount: number;
}

export type ScreenName =
  | 'login'
  | 'register'
  | 'home'
  | 'product-details'
  | 'cart'
  | 'profile'
  | 'orders'
  | 'favorites'
  | 'settings'
  | 'search';
