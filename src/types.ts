export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "macarons" | "cakes" | "breads" | "pastries" | "tarts";
  tag?: string;
  image: string;
  inStock: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Screen = "home" | "shop" | "wishlist" | "checkout" | "tracking";
