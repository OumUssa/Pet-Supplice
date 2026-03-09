import React from "react";
import {
  FaPaw,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaAward,
} from "react-icons/fa";
import Header from "../Header/Header";
import Footer from "../Header/Footer";
// import { BiDog, BiCat } from 'react-icons/bi';
// import { BsBird, BsFish } from 'react-icons/bs';
// import { GiRabbit } from 'react-icons/gi';

const AboutPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Header - Similar to your homepage */}

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-400 to-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About PETZONE
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your trusted partner in providing the best products for your
              beloved pets since 2010
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  PETZONE began with a simple mission: to provide pet owners
                  with high-quality, affordable products for their furry,
                  feathered, and finned friends. What started as a small
                  family-run store has grown into a comprehensive online
                  platform serving pet lovers nationwide.
                </p>
                <p className="text-gray-600 mb-4">
                  We understand that pets are more than just animals – they're
                  family members. That's why we're committed to offering only
                  the best products, from nutritious food to comfortable beds,
                  engaging toys to essential healthcare items.
                </p>
                <p className="text-gray-600">
                  Our team consists of passionate pet owners and experts who
                  carefully select every product in our inventory. When you shop
                  at PETZONE, you can trust that you're getting items that are
                  safe, durable, and loved by pets everywhere.
                </p>
              </div>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <img
                  src="https://picsum.photos/seed/petzone-team/600/400.jpg"
                  alt="PETZONE Team"
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pet Categories Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Categories We Serve
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                {/* <BiDog className="text-5xl text-blue-500 mx-auto mb-4" /> */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Dogs
                </h3>
                <p className="text-gray-600 text-sm">
                  Premium food, toys, accessories, and healthcare for your
                  canine companions
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                {/* <BiCat className="text-5xl text-orange-500 mx-auto mb-4" /> */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Cats
                </h3>
                <p className="text-gray-600 text-sm">
                  Everything your feline friend needs, from nutrition to
                  entertainment
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                {/* <BsBird className="text-5xl text-yellow-500 mx-auto mb-4" /> */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Birds
                </h3>
                <p className="text-gray-600 text-sm">
                  Cages, food, toys, and health products for birds of all sizes
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                {/* <BsFish className="text-5xl text-cyan-500 mx-auto mb-4" /> */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fish
                </h3>
                <p className="text-gray-600 text-sm">
                  Aquariums, filters, food, and decorations for your aquatic
                  pets
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                {/* <GiRabbit className="text-5xl text-purple-500 mx-auto mb-4" /> */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Small Pets
                </h3>
                <p className="text-gray-600 text-sm">
                  Specialized products for rabbits, hamsters, guinea pigs, and
                  more
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Passion for Pets
                </h3>
                <p className="text-gray-600">
                  We're pet lovers first, and business people second. Every
                  decision we make is guided by what's best for pets.
                </p>
              </div>
              <div className="text-center">
                <FaAward className="text-4xl text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Quality Assurance
                </h3>
                <p className="text-gray-600">
                  We carefully vet all products to ensure they meet our high
                  standards for safety, durability, and pet satisfaction.
                </p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-4xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Trust & Transparency
                </h3>
                <p className="text-gray-600">
                  We believe in honest business practices and providing clear
                  information about all our products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                <FaTruck className="text-4xl text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-600">
                  Free shipping on orders over $49 with quick delivery to your
                  doorstep
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                <FaHeadset className="text-4xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Expert Support
                </h3>
                <p className="text-gray-600">
                  Our knowledgeable team is ready to help with any pet-related
                  questions
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                <FaAward className="text-4xl text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Quality Guarantee
                </h3>
                <p className="text-gray-600">
                  100% satisfaction guarantee on all products with easy returns
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
                <FaPaw className="text-4xl text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Loyalty Program
                </h3>
                <p className="text-gray-600">
                  Earn rewards with every purchase and enjoy exclusive member
                  benefits
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-green-400 to-green-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the PETZONE Family</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Sign up for our newsletter to receive exclusive offers, new
              product updates, and pet care tips.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-gray-800 w-full sm:w-80"
              />
              <button className="bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        {/* <Footer/> */}
        <Footer/>
      </div>
    </>
  );
};

export default AboutPage;
