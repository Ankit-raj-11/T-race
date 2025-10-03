import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Project Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-black tracking-tight">
                T-race
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-black transition-colors duration-200 font-medium text-sm"
            >
              About
            </Link>
            <Link 
              href="/leaderboard" 
              className="text-gray-700 hover:text-black transition-colors duration-200 font-medium text-sm"
            >
              Leaderboard
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-gray-700 hover:text-black transition-colors duration-200"
              aria-label="Open menu"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden bg-white border-t border-gray-200">
        <div className="px-4 py-2 space-y-1">
          <Link 
            href="/about" 
            className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200"
          >
            About
          </Link>
          <Link 
            href="/leaderboard" 
            className="block px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Leaderboard
          </Link>
          <div className="px-3 py-2">
            <button className="w-full bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
