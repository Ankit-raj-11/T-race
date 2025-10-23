import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { SpeedInsights } from '@vercel/speed-insights/next';
SpeedInsights();
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
