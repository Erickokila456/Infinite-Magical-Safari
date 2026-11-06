import Image from "next/image";
import Link from "next/link";
import { prisma } from "./lib/prisma";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default async function Home() {
  // Fetch the tours directly from MySQL using Prisma!
  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen font-sans selection:bg-blue-500 selection:text-white relative bg-gray-50">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0 h-screen">
        <Image
          src="/hero-bg.jpg" 
          alt="Beautiful lake view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* NAVIGATION MENU (Now uses our new client component) */}
      <Navbar />

      {/* HERO TEXT LAYER */}
      <section className="relative z-10 h-screen flex items-center justify-center">
        <div className="text-center px-6 max-w-5xl mt-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/30 border border-blue-400/50 text-white text-sm font-bold tracking-widest mb-8 backdrop-blur-sm">
            ✈️ DISCOVER YOUR NEXT ADVENTURE
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
            Explore the World <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-lg">
              Your Journey Begins Here
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-medium drop-shadow-md">
            Discover breathtaking destinations, curated itineraries, and unforgettable experiences. 
            Let us handle the details while you make the memories.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="#tours" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              Explore Tours
            </Link>
          </div>
        </div>
      </section>

      {/* DYNAMIC TOURS SECTION (FROM DATABASE) */}
      <section id="tours" className="relative z-20 bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Featured Tours</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Hand-picked experiences for the adventure of a lifetime.</p>
          </div>

          {/* Check if there are no tours in the database */}
          {tours.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No tours available yet</h3>
              <p className="text-gray-500 mb-6">Head over to the Admin panel to add your first tour.</p>
              <Link href="/admin" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
                Go to Admin
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Loop through the real tours from the database */}
              {tours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
                  
                  <div className="relative h-64 w-full">
                    <img 
                      src={tour.imageUrl || "/hero-bg.jpg"} 
                      alt={tour.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{tour.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-2xl font-black text-blue-600">${tour.price}</p>
                      </div>
                      <Link 
                        href={`/book/${tour.id}`} 
                        className="bg-gray-900 hover:bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-md"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </section>
      
      {/* ADD FOOTER HERE */}
      <Footer />

    </main>
  );
}