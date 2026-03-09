import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "../Header/Header";
import Footer from "../Header/Footer";

const Contact = () => {
  return (

   <>
   <Header/>
     <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-md space-y-6 text-gray-700">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Contact Pet Supplies Center
        </h1>
        <p className="text-center text-gray-600">
          Have questions about products or services? Reach out—our friendly team is here to help!
        </p>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-100 rounded-xl p-4">
            <Phone className="mx-auto w-6 h-6" />
            <h2 className="font-semibold mt-2">Phone</h2>
            <p className="text-gray-600 text-sm">+855 12 345 678</p>
          </div>

          <div className="bg-blue-100 rounded-xl p-4">
            <Mail className="mx-auto w-6 h-6" />
            <h2 className="font-semibold mt-2">Email</h2>
            <p className="text-gray-600 text-sm">support@petsupplies.com</p>
          </div>

          <div className="bg-blue-100 rounded-xl p-4">
            <MapPin className="mx-auto w-6 h-6" />
            <h2 className="font-semibold mt-2">Address</h2>
            <p className="text-gray-600 text-sm">Phnom Penh, Cambodia</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default Contact;
