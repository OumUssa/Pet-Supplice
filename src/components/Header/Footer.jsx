import { Link } from "react-router-dom";
import {
  FaAward,
  FaHeadset,
  FaHeart,
  FaPaw,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto text-white bg-[linear-gradient(140deg,#0f766e_0%,#0f172a_70%)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaPaw className="text-teal-100 text-2xl" />
              <span className="text-2xl font-black tracking-wide">PETZONE</span>
            </div>
            <p className="text-teal-50/90 leading-relaxed">
              One pet website for shopping, support, and trusted care guidance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-teal-50/90">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Why PETZONE</h3>
            <ul className="space-y-3 text-teal-50/90">
              <li className="flex items-center gap-2">
                <FaTruck /> Fast support and delivery help
              </li>
              <li className="flex items-center gap-2">
                <FaHeadset /> Friendly customer guidance
              </li>
              <li className="flex items-center gap-2">
                <FaShieldAlt /> Trusted product quality
              </li>
              <li className="flex items-center gap-2">
                <FaAward /> Curated by pet-care focus
              </li>
              <li className="flex items-center gap-2">
                <FaHeart /> Built with pet-first values
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-teal-50/90">
              <li>Phnom Penh, Cambodia</li>
              <li>support@petzone.com</li>
              <li>+855 12 345 678</li>
              <li>Mon-Sat: 8:00 AM - 8:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-100/30 mt-8 pt-6 text-center text-teal-50/80">
          <p>© 2026 PETZONE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
