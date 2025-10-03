// src/components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-sm">
    <div className="text-xl font-bold">
        T-Race
    </div>

    <nav className="space-x-4">
        <Link
        href="/about"
        className="hover:text-gray-300 transition-colors duration-200"
        >
        About
        </Link>
        <Link
        href="/leaderboard"
        className="hover:text-gray-300 transition-colors duration-200"
        >
        Leaderboard
        </Link>
    </nav>
    </header>


  );
}
