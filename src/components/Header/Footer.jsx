import {
  FaPaw,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaAward,
} from "react-icons/fa";

const Footer=()=>{
    return (
        <>   
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FaPaw className="text-green-400 text-2xl" />
                  <span className="text-2xl font-bold">PETZONE</span>
                </div>
                <p className="text-gray-400">
                  Your one-stop shop for all your pet needs. Quality products
                  for happy pets.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Pet Categories</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Dog Supplies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Cat Supplies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Bird Supplies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Fish Supplies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Small Pet Supplies
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Pet Street, Animal City</li>
                  <li>contact@petzone.com</li>
                  <li>1-800-PETZONE</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2026 PETZONE. All rights reserved.</p>
            </div>
          </div>
        </footer>
        </>
    )
}
export default Footer;