import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-700 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        
        <div className="flex items-center gap-3 font-bold text-white text-2xl md:text-3xl">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            T-race
          </span>
        </div>

        <nav className="flex items-center gap-10">
          <Link
            href="/about"
            className="text-gray-500 hover:text-gray-200 transition-colors duration-300 px-2"
          >
            About
          </Link>
          <Link
            href="/leaderboard"
            className="text-gray-500 hover:text-gray-200 transition-colors duration-300 px-2"
          >
            Leaderboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
