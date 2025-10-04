import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with real signup API call
      await new Promise((res) => setTimeout(res, 800));

      // On success, redirect to home or race page
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Create your account</h1>
        <p className="text-sm text-gray-300 mb-6">
          Sign up to track your progress, save scores, and compete on
          leaderboards.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose a strong password"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md font-medium hover:brightness-105 transition"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Get started"}
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-400 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
