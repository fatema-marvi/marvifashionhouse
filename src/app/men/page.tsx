'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const MensPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "mensWear"]{
        _id,
        name,
        price,
        "imageUrl": image.asset->url
      }`;
      
      const data = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Men&apos;s Wear</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <div className="relative w-full h-64">
              <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" />
            </div>
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">PKR {product.price}</p>
            <Link href={`/product/${product._id}`}>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg w-full">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MensPage;
