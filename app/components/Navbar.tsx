"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="relative z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
    <span className="text-white font-bold text-xl">I</span> {/* Changed to 'I' for Infinite */}
  </div>
  <span className="text-2xl font-black text-gray-900 tracking-tight">
    Infinite <span className="text-blue-600">Magical Safaris</span>
  </span>
</Link>

                {/* Links */}
        <div className="hidden md:flex space-x-10">
          <Link href="#tours" className="text-gray-600 font-semibold hover:text-blue-600">Tours</Link>
          
          {/* Only show Admin link if user is an ADMIN */}
          {session?.user?.role === "ADMIN" && (
            <Link href="/admin" className="text-gray-600 font-semibold hover:text-blue-600">Admin Dashboard</Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          {status === "loading" ? (
            <span className="text-gray-400">Loading...</span>
          ) : session ? (
            // If user is logged in
            <>
              <span className="text-gray-700 font-semibold">
                Hello, {session.user?.name || "User"}
              </span>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-50 text-red-600 hover:bg-red-100 px-5 py-2 rounded-full font-semibold transition"
              >
                Log Out
              </button>
            </>
          ) : (
            // If user is NOT logged in
            <>
              <Link href="/login" className="text-gray-700 font-semibold hover:text-blue-600 transition">
                Log in
              </Link>
              <Link href="/book" className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg">
                Book Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}