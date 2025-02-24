"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearch } from "../context/searchContext";

// Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  description: string;
}

// Props interface
interface ProductListProps {
  products: Product[];
}

// Fetch products directly inside the component
const ProductList = async () => {
  // Fetch products from API
  const response = await fetch("https://api.example.com/products", {
    cache: "no-store", // To prevent caching in SSR
  });
  const products: Product[] = await response.json();

  return <ProductListClient products={products} />;
};

// Client component to handle state and search
const ProductListClient: React.FC<ProductListProps> = ({ products }) => {
  const { searchQuery } = useSearch();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (!filteredProducts || filteredProducts.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No products found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative w-full h-64 overflow-hidden group rounded-xl shadow-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1">
                PKR {product.price.toFixed(2)}
              </p>
              <Link href={`/product/${product.id}`}>
                <button className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
