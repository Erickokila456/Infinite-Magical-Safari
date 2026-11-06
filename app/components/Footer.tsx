import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* 1. Brand & About */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Infinite <span className="text-blue-500">Safaris</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Discover breathtaking destinations, curated itineraries, and unforgettable experiences across Africa and beyond.
          </p>
          {/* Social Media Links */}
          <div className="flex space-x-4">
            {/* Add your social links here */}
            <a href="https://www.facebook.com/share/1EEAWsf7RU/" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
              <span className="text-white text-xs font-bold">FB</span>
            </a>
            <a href="https://www.instagram.com/infinite_magical_safaris?rpxt=MXMwdjMyd2Rkd2J2bg==" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors">
              <span className="text-white text-xs font-bold">IG</span>
            </a>
            <a href="https://whatsapp.com/channel/0029VbEFGjuCxoAos8iAJk1z" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-800 transition-colors">
              <span className="text-white text-xs font-bold">WA</span>
            </a>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link href="#tours" className="hover:text-blue-400 transition-colors">Tours</Link></li>
            <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Admin</Link></li>
          </ul>
        </div>

        {/* 3. Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span>📍</span>
              <span>Nairobi, Kenya<br/>Westlands, Waiyaki Way</span>
            </li>
            <li className="flex items-center gap-3">
              <span>📞</span>
              <a href="tel:+254143659601" className="hover:text-blue-400 transition-colors">+25414365901</a>
            </li>
            <li className="flex items-center gap-3">
              <span>✉️</span>
              <a href="infinitemagicalsafari@gmail.com" className="hover:text-blue-400 transition-colors">infinitemagicalsafari@gmail.com</a>
            </li>
            <li className="flex items-center gap-3 mt-4">
              <a href="https://wa.me/254143659601" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full font-semibold transition-colors text-xs">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* 4. GOOGLE MAP INTEGRATION */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Our Location</h4>
          <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg border border-gray-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.288999999999!2d36.8065!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6a0000001%3A0x123456789abcdef!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Infinite Magical Safaris. All rights reserved.</p>
      </div>
    </footer>
  );
}