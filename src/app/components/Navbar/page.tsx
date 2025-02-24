"use client";

import { useState } from "react";
import { ShoppingCart, Search, Info } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/cartContext";
import { useSearch } from "../context/searchContext"; // Import useSearch
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
  const { cartCount } = useCart();
  const { setSearchQuery } = useSearch(); // Use search context
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim()); // Update search query in context
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container pl-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-5xl font-serif font-bold text-black hover:text-blue-800 transition-colors duration-300">          
          Marvi Fashion House
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/men" className="text-blue-800 font-bold text-2xl hover:text-gray-900">
            Men
          </Link>
          <Link href="/women" className="text-blue-800 font-bold text-2xl hover:text-gray-900">
            Women
          </Link>
          <Link href="/bed" className="text-blue-800 font-bold text-2xl hover:text-gray-900">
            Bed
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border rounded-full py-2 px-4 pr-10 w-64"
          />
          <button type="submit" className="absolute right-3 top-2 text-gray-500">
            <Search size={18} />
          </button>
        </form>

        {/* Cart & Info */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            <Info size={24} />
          </Link>

           {/* WhatsApp */}
           <Link
            href="https://wa.me/923322169105" // Replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-700"
          >
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
