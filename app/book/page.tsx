"use client"; 

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BookingPage() {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* Simple Header */}
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
        
        {/* LEFT COLUMN: Tour Details & Itinerary */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
              alt="Safari Adventure"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
              7 Days / 6 Nights
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">Safari Adventure in Kenya</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Experience the magic of the African savannah. Witness the Great Migration, 
              spot the Big Five, and immerse yourself in the rich culture of the Maasai people.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Tour Itinerary</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">1</div>
                <div>
                  <h3 className="font-bold text-gray-900">Arrival in Nairobi</h3>
                  <p className="text-sm text-gray-500 mt-1">Arrive at Jomo Kenyatta International Airport. Transfer to your hotel and rest.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">2</div>
                <div>
                  <h3 className="font-bold text-gray-900">Maasai Mara</h3>
                  <p className="text-sm text-gray-500 mt-1">Drive to the Maasai Mara. Afternoon game drive to spot lions and elephants.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-28">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Book This Tour</h2>
            
            <div className="mb-6">
              <p className="text-gray-500 text-sm">Total Price</p>
              <p className="text-4xl font-black text-blue-600">$1,200</p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Guests</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3 People</option>
                  </select>
                </div>
              </div>

              {/* PAYMENT METHOD SECTION */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Payment Method</label>
                
                <div className="space-y-3">
                  <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} className="w-4 h-4 text-blue-600" />
                    <span className="ml-3 font-medium text-gray-900 flex items-center gap-2">📱 M-Pesa (Mobile Money)</span>
                  </label>

                  <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-blue-600" />
                    <span className="ml-3 font-medium text-gray-900 flex items-center gap-2">💳 Credit / Debit Card</span>
                  </label>

                  <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="w-4 h-4 text-blue-600" />
                    <span className="ml-3 font-medium text-gray-900 flex items-center gap-2">🏦 Bank Transfer</span>
                  </label>
                </div>
              </div>

              {/* DYNAMIC BANK DETAILS BOX */}
              {paymentMethod === 'bank' && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                  <p className="font-bold text-gray-900 mb-2">Our Bank Details:</p>
                  <div className="space-y-1 text-gray-600">
                    <p><span className="font-semibold text-gray-800">Bank Name:</span> Equity Bank</p>
                    <p><span className="font-semibold text-gray-800">Account Name:</span> Travel Agency Ltd</p>
                    <p><span className="font-semibold text-gray-800">Account No:</span> 1234 5678 9012</p>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl mt-6 transition-all shadow-lg">
                {paymentMethod === 'bank' ? 'Confirm Booking' : 'Proceed to Payment'}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4">🔒 100% Secure Checkout</p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}