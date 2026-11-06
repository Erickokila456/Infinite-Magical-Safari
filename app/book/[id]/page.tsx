"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string | null;
  itinerary: string | null;
}

export default function DynamicBookingPage() {
  const params = useParams();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: "1",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`/api/tours/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setTour(data.tour);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchTour();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // This prevents the "tour is possibly null" error
    if (!tour) return; 

    setStatus("Saving booking...");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour.id,
          date: formData.date,
          amount: tour.price,
        }),
      });

      if (res.ok) {
        setStatus("✅ Booking saved! Proceeding to payment...");
      } else {
        setStatus("❌ Failed to save booking.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ An error occurred.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading tour details...</div>;
  if (!tour) return <div className="min-h-screen flex items-center justify-center text-xl">Tour not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-black text-gray-900">TravelAgency</span>
          </Link>
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tour.imageUrl || "/hero-bg.jpg"} alt={tour.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">{tour.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{tour.description}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Tour Itinerary</h2>
            <div className="whitespace-pre-wrap text-gray-600">
              {tour.itinerary || "Itinerary will be provided soon."}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Book This Tour</h2>
            
            <div className="mb-6">
              <p className="text-gray-500 text-sm">Total Price</p>
              <p className="text-4xl font-black text-blue-600">${tour.price}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" required placeholder="John Doe" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" required placeholder="john@example.com" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Guests</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3 People</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-6 transition-all shadow-lg">
                Proceed to Payment
              </button>
              
              {status && <p className="text-center text-sm font-bold text-blue-600 mt-4">{status}</p>}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}