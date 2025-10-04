import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="relative w-full bg-[#0a0a0a] border-b border-[#1f1f1f] z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
       <Link
  href="/"
  className="
    text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500
    px-2 py-2 -ml-13 ring-1 ring-pink-400 rounded-lg shadow-lg tracking-widest transition-all duration-300
  ">
  T-RACE
</Link>

 feature/navbar-responsive

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link 
                            href="/about" 
                            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                        >
                            About
                        </Link>
                        <Link 
                            href="/leaderboard" 
                            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                        >
                            Leaderboard
                        </Link>
                        <Link 
                            href="/race" 
                            className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                        >
                            Race
                        </Link>
                        <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                            Get Started
                        </button>
                    </nav>
main

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-25 text-white">
          <Link href="/" className="hover:text-cyan-40 transition-all ring-1 hover:ring-cyan-400 rounded px-2">Home</Link>
          <Link href="/leaderboard" className="hover:text-cyan-40 transition-all ring-1 hover:ring-cyan-400 rounded px-2">Leaderboard</Link>
          <Link href="/profile" className="hover:text-cyan-40 transition-all ring-1 hover:ring-cyan-400 rounded px-2">Profile</Link>
          <button className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 text-black font-semibold shadow-lg cursor-pointer shadow-cyan-400/50 transition-all">
            Login/Sign Up
          </button>
        </nav>

 feature/navbar-responsive
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-800 py-4">
                        <div className="flex flex-col gap-4">
                            <Link 
                                href="/about" 
                                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link 
                                href="/leaderboard" 
                                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Leaderboard
                            </Link>
                            <Link 
                                href="/race" 
                                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Race
                            </Link>
                            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 w-full">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </div>
 main

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#1f1f1f] py-4 px-6 flex flex-col gap-4 text-white">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400">Home</Link>
          <Link href="/leaderboard" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400">Leaderboard</Link>
          <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="hover:text-cyan-400">Profile</Link>
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 text-black font-semibold shadow-lg shadow-cyan-400/50 w-full">
            Login/Sign Up
          </button>
        </div>
      )}
    </header>
  );
}
