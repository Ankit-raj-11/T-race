import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signInWithGoogle, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-2xl font-bold">
              T-race
            </span>
          </Link>

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
            {/* Signup/Login/Logout/Avatar */}
            {!loading && !user && (
              <>
                <button
                  onClick={signInWithGoogle}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  Signup
                </button>
              </>
            )}
            {!loading && user && (
              <>
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-9 h-9 rounded-full border-2 border-cyan-500 object-cover mr-2"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={logout}
                  className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
              {/* Signup/Login/Logout/Avatar */}
              {!loading && !user && (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      signInWithGoogle();
                    }}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-full"
                  >
                    Signup
                  </button>
                  {/* Optionally, you can keep the Login button if you want */}
                  {/* <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      signInWithGoogle();
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-full"
                  >
                    Login
                  </button> */}
                </>
              )}
              {!loading && user && (
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-9 h-9 rounded-full border-2 border-cyan-500 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </header>
  );
}
