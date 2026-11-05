export interface CoffeeProduct {
  id: string;
  name: string;
  slug: string;
  category: 'single_origin' | 'blend' | 'gear' | 'signature_drink';
  roast_level?: string;
  origin?: string;
  altitude?: string;
  process_method?: string;
  flavor_notes?: string[];
  price: number;
  rating: number;
  reviews_count: number;
  image_url: string;
  description: string;
  in_stock: boolean;
  is_featured: boolean;
  created_at?: string;
}

export interface CoffeeStore {
  id: string;
  name: string;
  city: string;
  country: string;
  region: 'North America' | 'Europe' | 'Asia-Pacific' | 'Middle East' | 'Africa';
  address: string;
  phone?: string;
  hours: string;
  is_flagship: boolean;
  image_url?: string;
  manager_name?: string;
  lat?: number;
  lng?: number;
  created_at?: string;
}

export interface FranchiseInquiry {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  model_type: string;
  investment_capital: string;
  previous_experience?: string;
  proposed_timeline?: string;
  message?: string;
  status?: string;
  created_at?: string;
}

export interface CoffeeBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  author_role?: string;
  author_avatar?: string;
  cover_image: string;
  read_time: string;
  tags?: string[];
  published: boolean;
  claps_count: number;
  created_at?: string;
}

export interface CartItem {
  product: CoffeeProduct;
  quantity: number;
  grindOption?: string;
}

export interface CoffeeOrder {
  id?: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    grindOption?: string;
  }>;
  shipping_country: string;
  shipping_address: string;
  status?: string;
  created_at?: string;
}
