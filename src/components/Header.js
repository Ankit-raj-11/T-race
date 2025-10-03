import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 relative z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent cursor-pointer hover:opacity-90 transition">
            T-race
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8 text-sm text-gray-300">
          <Link href="/">
            <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-purple-400 transition">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-purple-400 transition">
              About
            </span>
          </Link>
          <Link href="/contact">
            <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-purple-400 transition">
              Contact
            </span>
          </Link>
        </nav>

        {/* Sign In (Desktop) */}
        <Link href="/login" className="hidden md:inline-block">
          <span className="px-4 py-1 border border-purple-400 rounded-md text-purple-400 hover:bg-purple-400 hover:text-gray-900 transition cursor-pointer text-sm">
            Sign In
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Side Drawer Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 border-l border-gray-700 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden z-40`}
      >
        <nav className="flex flex-col items-start mt-20 space-y-6 px-6 text-gray-300">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-purple-400 transition">
              Home
            </span>
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-purple-400 transition">
              About
            </span>
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <span className="cursor-pointer hover:text-white border-b-2 border-transparent hover:border-purple-400 transition">
              Contact
            </span>
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <span className="px-4 py-1 border border-purple-400 rounded-md text-purple-400 hover:bg-purple-400 hover:text-gray-900 transition cursor-pointer text-sm">
              Sign In
            </span>
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}
