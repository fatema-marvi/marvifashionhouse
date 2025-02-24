'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useCart } from "@/app/components/context/cartContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  colors: { colorName: string; image: string }[];
  sizes: string[];
  imageUrl: string;
  sizeChart?: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<{ colorName: string; image: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch('/api/product')
        .then((res) => res.json())
        .then((data) => {
          const selectedProduct = data.find((p: Product) => p._id === id);
          if (!selectedProduct) {
            setError('Product not found');
          } else {
            setProduct(selectedProduct);

            // Filter similar products based on category
            const filteredSimilar = data.filter(
              (p: Product) => p.category === selectedProduct.category && p._id !== id
            );
            setSimilarProducts(filteredSimilar);
          }
        })
        .catch(() => setError('Failed to fetch product'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: selectedColor?.image || product.imageUrl,
      selectedSize,
      quantity: 1,
      selectedColor: selectedColor?.colorName || "Default",
    };

    addToCart(cartItem);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative w-full h-96">
          <Image
            src={selectedColor?.image || product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-2">PKR {product.price.toFixed(2)}</p>
          <p className="mt-4 text-black whitespace-pre-line">{product.description}</p>

          {/* Color & Size Selectors */}
          {product.colors?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Select Color:</h3>
              <div className="flex space-x-2 mt-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 border-2 rounded-full overflow-hidden cursor-pointer ${
                      selectedColor?.colorName === color.colorName ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <Image src={color.image} alt={color.colorName} width={40} height={40} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Select Size:</h3>
              <div className="flex space-x-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizeChart && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Size Chart:</h3>
              <div className="w-full h-64 relative border">
                <Image 
                  src={product.sizeChart} 
                  alt="Size Chart" 
                  layout="fill" 
                  objectFit="contain"
                />
              </div>
            </div>
          )}

          <button
            className={`mt-6 px-6 py-2 rounded-lg w-full transition ${
              selectedSize
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            {selectedSize
              ? `Add to Cart - ${product.name} (${selectedColor ? selectedColor.colorName : 'Default'}, Size: ${selectedSize})`
              : 'Select a Size to Add to Cart'}
          </button>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-60">
          <h2 className="text-4xl text-black md:text-3xl font-bold mb-6 text-center">You Might Also Like</h2>

          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {similarProducts.map((similarProduct) => (
              <SwiperSlide key={similarProduct._id}>
                <Link href={`/product/${similarProduct._id}`}>
                  <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative w-full h-56">
                      <Image
                        src={similarProduct.imageUrl}
                        alt={similarProduct.name}
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-300 ease-in-out"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{similarProduct.name}</h3>
                      <p className="text-gray-600 text-sm">PKR {similarProduct.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
