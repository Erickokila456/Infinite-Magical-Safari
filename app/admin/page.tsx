"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    itinerary: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (res.ok) {
        setStatus("✅ Tour added successfully!");
        setFormData({ title: "", description: "", price: "", imageUrl: "", itinerary: "" });
      } else {
        setStatus("❌ Failed to add tour.");
      }
    } catch (error) {
      // We log the error so VS Code doesn't complain
      console.error(error);
      setStatus("❌ An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Add new tours to your travel agency.</p>
          </div>
          <Link href="/" className="bg-gray-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
            View Website
          </Link>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a New Tour</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tour Title</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Maldives Luxury Escape" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the experience..." 
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                <input 
                  type="number" 
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="1200" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                <input 
                  type="url" 
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Itinerary (Optional)</label>
              <textarea 
                value={formData.itinerary}
                onChange={(e) => setFormData({...formData, itinerary: e.target.value})}
                placeholder="Day 1: Arrival... Day 2:..." 
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg w-full md:w-auto"
            >
              Save Tour to Database
            </button>

            {status && <p className="mt-4 font-semibold text-blue-600">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}