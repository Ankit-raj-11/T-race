import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LeaderboardPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/users/leaderboard?limit=50');
      const data = await res.json();
      setRows(data.leaderboard || []);
    } catch (err) {
      console.error('Failed to load leaderboard', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const id = setInterval(fetchLeaderboard, 30000); // refresh every 30s
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Global Leaderboard</h1>
          <p className="text-gray-400 text-sm">Rank · Player · Best WPM</p>
        </div>

        <div className="space-y-2">
          {rows.length === 0 && (
            <div className="text-center text-gray-400 py-12">No leaderboard data yet.</div>
          )}

          {rows.map((row) => (
            <div
              key={row.userId || row.rank}
              className="flex items-center gap-4 bg-gray-800/40 border border-gray-700 rounded-lg p-3"
            >
              <div className="w-10 text-center text-gray-300 font-mono">{row.rank}</div>

              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                  {row.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={row.photoURL}
                      alt={row.displayName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-lg">🏆</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="font-medium">{row.displayName}</div>
                </div>
              </div>

              <div className="w-28 text-right">
                <div className="text-sm text-gray-400">Best WPM</div>
                <div className="font-bold text-cyan-400 text-lg">{row.lastTestWPM}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
