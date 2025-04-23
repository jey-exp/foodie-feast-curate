
export type UserRole = "customer" | "caterer";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface CatererProfile {
  id: string;
  user_id: string;
  name: string;
  location: string;
  description: string;
  avg_price: number | null;
  is_complete: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export type MealType = "breakfast" | "lunch" | "dinner";

export interface MenuItem {
  id: string;
  caterer_id: string;
  name: string;
  description: string;
  price: number;
  meal_type: MealType;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CuratedItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customer_id: string;
  caterer_id: string;
  total_amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  delivery_address: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price_per_item: number;
  created_at: string;
}

export interface CustomerProfile {
  id: string;
  user_id: string;
  name: string;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
}
