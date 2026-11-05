import { createClient } from "@supabase/supabase-js";
import {
  CoffeeProduct,
  CoffeeStore,
  CoffeeBlog,
  FranchiseInquiry,
  CoffeeOrder,
} from "@/types";
import {
  INITIAL_PRODUCTS,
  INITIAL_STORES,
  INITIAL_BLOGS,
} from "./seed-data";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://rdaudofnzkilnsyhtahk.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkYXVkb2ZuemtpbG5zeWh0YWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3MDI0NTQsImV4cCI6MjEwOTI3ODQ1NH0.CKDkkp1SPHwy8dlizloDyNBQD-d2ThvuapOkJKvAviM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product Queries
export async function fetchProducts(): Promise<CoffeeProduct[]> {
  try {
    const { data, error } = await supabase
      .from("coffee_products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Supabase products fetch fallback to seed data:", error?.message);
      return INITIAL_PRODUCTS;
    }
    return data as CoffeeProduct[];
  } catch (err) {
    console.error("fetchProducts error:", err);
    return INITIAL_PRODUCTS;
  }
}

// Stores Queries
export async function fetchStores(): Promise<CoffeeStore[]> {
  try {
    const { data, error } = await supabase
      .from("coffee_stores")
      .select("*")
      .order("is_flagship", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Supabase stores fetch fallback to seed data:", error?.message);
      return INITIAL_STORES;
    }
    return data as CoffeeStore[];
  } catch (err) {
    console.error("fetchStores error:", err);
    return INITIAL_STORES;
  }
}

// Blogs Queries
export async function fetchBlogs(): Promise<CoffeeBlog[]> {
  try {
    const { data, error } = await supabase
      .from("coffee_blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Supabase blogs fetch fallback to seed data:", error?.message);
      return INITIAL_BLOGS;
    }
    return data as CoffeeBlog[];
  } catch (err) {
    console.error("fetchBlogs error:", err);
    return INITIAL_BLOGS;
  }
}

// Franchise Inquiries
export async function submitFranchiseInquiry(
  inquiry: Omit<FranchiseInquiry, "id" | "status" | "created_at">
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("coffee_franchise_inquiries")
      .insert([
        {
          full_name: inquiry.full_name,
          email: inquiry.email,
          phone: inquiry.phone,
          country: inquiry.country,
          city: inquiry.city,
          model_type: inquiry.model_type,
          investment_capital: inquiry.investment_capital,
          previous_experience: inquiry.previous_experience || "N/A",
          proposed_timeline: inquiry.proposed_timeline || "6-12 Months",
          message: inquiry.message || "",
          status: "new",
        },
      ])
      .select();

    if (error) {
      console.error("Error submitting inquiry to Supabase:", error);
      return { success: false, error: error.message };
    }
    return { success: true, id: data?.[0]?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit inquiry";
    console.error("submitFranchiseInquiry error:", err);
    return { success: false, error: message };
  }
}

export async function fetchFranchiseInquiries(): Promise<FranchiseInquiry[]> {
  try {
    const { data, error } = await supabase
      .from("coffee_franchise_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("fetchFranchiseInquiries error:", error);
      return [];
    }
    return (data || []) as FranchiseInquiry[];
  } catch (err) {
    console.error("fetchFranchiseInquiries error:", err);
    return [];
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  return await supabase
    .from("coffee_franchise_inquiries")
    .update({ status })
    .eq("id", id);
}

// Orders
export async function createOrder(
  order: Omit<CoffeeOrder, "id" | "created_at">
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("coffee_orders")
      .insert([
        {
          customer_name: order.customer_name,
          customer_email: order.customer_email,
          total_amount: order.total_amount,
          items: order.items,
          shipping_country: order.shipping_country,
          shipping_address: order.shipping_address,
          status: "processing",
        },
      ])
      .select();

    if (error) {
      console.error("Error creating order:", error);
      return { success: false, error: error.message };
    }
    return { success: true, id: data?.[0]?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    return { success: false, error: message };
  }
}

export async function fetchOrders(): Promise<CoffeeOrder[]> {
  try {
    const { data, error } = await supabase
      .from("coffee_orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];
    return (data || []) as CoffeeOrder[];
  } catch {
    return [];
  }
}

// CMS Mutations
export async function upsertProduct(product: Partial<CoffeeProduct>) {
  if (product.id && !product.id.startsWith("prod-")) {
    return await supabase
      .from("coffee_products")
      .update(product)
      .eq("id", product.id);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newProduct } = product;
    return await supabase.from("coffee_products").insert([newProduct]);
  }
}

export async function deleteProduct(id: string) {
  return await supabase.from("coffee_products").delete().eq("id", id);
}

export async function upsertBlog(blog: Partial<CoffeeBlog>) {
  if (blog.id && !blog.id.startsWith("blog-")) {
    return await supabase
      .from("coffee_blogs")
      .update(blog)
      .eq("id", blog.id);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newBlog } = blog;
    return await supabase.from("coffee_blogs").insert([newBlog]);
  }
}

export async function deleteBlog(id: string) {
  return await supabase.from("coffee_blogs").delete().eq("id", id);
}

export async function upsertStore(store: Partial<CoffeeStore>) {
  if (store.id && !store.id.startsWith("store-")) {
    return await supabase
      .from("coffee_stores")
      .update(store)
      .eq("id", store.id);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newStore } = store;
    return await supabase.from("coffee_stores").insert([newStore]);
  }
}

export async function deleteStore(id: string) {
  return await supabase.from("coffee_stores").delete().eq("id", id);
}
