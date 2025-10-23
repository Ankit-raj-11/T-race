import { ArrowRight, Target, Trophy, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-cyan-600/30"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)'
            }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
              <Image src="/logo.png" alt="T-race" width={300} height={200} />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Challenge yourself in the ultimate typing speed competition. Race against time and
              climb the leaderboard!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/race"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
              >
                <Zap size={24} />
                <span>Start Racing</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/leaderboard"
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 flex items-center space-x-2"
              >
                <Trophy size={20} />
                <span>View Leaderboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Why Choose T-Race?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-gray-800 border border-gray-700 hover:border-cyan-400/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-white" />
              </div>
              <Link href="/practice" className="text-xl font-semibold mb-3 text-cyan-400">
                Practice Mode
              </Link>
              <p className="text-gray-300">
                Improve your typing accuracy with our advanced real-time feedback system
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-800 border border-gray-700 hover:border-purple-400/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Speed Boost</h3>
              <p className="text-gray-300">
                Track your WPM progress and watch your typing speed soar to new heights
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-800 border border-gray-700 hover:border-green-400/50 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">Global Competition</h3>
              <p className="text-gray-300">
                Compete with typists worldwide and earn your place on the global leaderboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Race?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users improving their typing skills every day. Start your journey to
            becoming a typing champion!
          </p>
          <Link
            href="/race"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 space-x-2"
          >
            <span>Begin Your First Race</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
