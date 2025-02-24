// Define Product type
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  description: string;
}
export type SortOption = "default" | "price-low" | "price-high" | "name";

// Use Product type instead of any
export const sortProducts = (products: Product[], sortOption: SortOption): Product[] => {
  return [...products].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    return 0; // Default order
  });
};
