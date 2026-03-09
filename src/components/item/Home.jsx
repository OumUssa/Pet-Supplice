import React, { useState, useEffect } from "react";
import { getPetSupplies } from "../../store/suppliesStore.";

const slides = [
  {
    subtitle: "Up to",
    title: "45% OFF",
    desc: "Thousands of pet favourites",
    image: "/image/download-Photoroom.png",
    bg: "bg-blue-200", // Soft Blue
  },
  {
    subtitle: "Special Offer",
    title: "30% OFF",
    desc: "Healthy food for your pets",
    image: "/image/download-Photoroom (1).png",
    bg: "bg-green-200", // Soft Green
  },
  {
    subtitle: "Limited Time",
    title: "Buy 1 Get 1",
    desc: "Toys & accessories",
    image: "/image/Kediler-Photoroom.png",
    bg: "bg-purple-200", // Soft Purple
  },
];
const categories = [
    {
      name: 'Dog Food',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9,2V8H11V11H5C3.89,11 3,11.89 3,13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21V13A2,2 0 0,0 19,11H13V8H15V2H9Z" />
        </svg>
      ),
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Cat Food',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
        </svg>
      ),
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Treats',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5.5,2C3.56,2 2,3.56 2,5.5C2,7.44 3.56,9 5.5,9C7.44,9 9,7.44 9,5.5C9,3.56 7.44,2 5.5,2M18.5,2C16.56,2 15,3.56 15,5.5C15,7.44 16.56,9 18.5,9C20.44,9 22,7.44 22,5.5C22,3.56 20.44,2 18.5,2M5.5,11C3.56,11 2,12.56 2,14.5C2,16.44 3.56,18 5.5,18C7.44,18 9,16.44 9,14.5C9,12.56 7.44,11 5.5,11M18.5,11C16.56,11 15,12.56 15,14.5C15,16.44 16.56,18 18.5,18C20.44,18 22,16.44 22,14.5C22,12.56 20.44,11 18.5,11M12,16C10.06,16 8.5,17.56 8.5,19.5C8.5,21.44 10.06,23 12,23C13.94,23 15.5,21.44 15.5,19.5C15.5,17.56 13.94,16 12,16Z" />
        </svg>
      ),
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Trees & Scratchers',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
        </svg>
      ),
      bgColor: 'bg-green-50'
    },
    {
      name: 'Toys',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
        </svg>
      ),
      bgColor: 'bg-pink-50'
    },
    {
      name: 'Bowls & Dishes',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2,15V17H22V15H2M4,19V21H20V19H4M2,11H22C22,9.9 21.1,9 20,9H16C16,7.9 15.1,7 14,7H10C8.9,7 8,7.9 8,9H4C2.9,9 2,9.9 2,11M4,13H20V11H4V13Z" />
        </svg>
      ),
      bgColor: 'bg-orange-50'
    },
    {
      name: 'Carriers',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
        </svg>
      ),
      bgColor: 'bg-indigo-50'
    },
    {
      name: 'Litter & Litter Box',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5M7,7H17V9H7V7M7,11H17V13H7V11M7,15H17V17H7V15Z" />
        </svg>
      ),
      bgColor: 'bg-gray-50'
    }
  ]
const handleClick = (name) => {
  console.log(`Clicked on ${name} category`);
};

function HeroSlider() {
  const [index, setIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <section className="w-full flex justify-center py-6 bg-white">
      {/* Container restricted to 90% or max-width for better look on big screens */}
      <div className="w-full max-w-7xl px-6">
        {/* The Card - using slide.bg dynamically */}
        <div
          className={`relative min-h-120 ${slide.bg} rounded-4xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between transition-colors duration-1000 ease-in-out overflow-hidden`}>
          {/* LEFT TEXT CONTENT */}
          <div
            key={index} // Key forces re-render for animation
            className="z-10 max-w-lg space-y-4 animate-in fade-in slide-in-from-left-5 duration-700">
            <p className="text-lg font-extrabold text-gray-700 uppercase tracking-wide">
              {slide.subtitle}
            </p>

            <h1 className="text-5xl md:text-7xl font-black text-blue-900 leading-tight">
              {slide.title}
            </h1>

            <p className="text-2xl text-gray-800 font-medium">{slide.desc}</p>

            <button className="mt-4 bg-emerald-900 text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg">
              Shop Now →
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative mt-8 md:mt-0 flex justify-center items-end">
            <img 
              key={slide.image}
              src={slide.image}
              alt="Pet Promotion"
              className="w-50 object-contain animate-in fade-in zoom-in-95 duration-700"
            />
          </div>

          {/* DOTS NAVIGATION */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer h-2 ${
                  i === index
                    ? "w-8 bg-gray-800" // Active: elongated pill
                    : "w-2 bg-gray-400 hover:bg-gray-600" // Inactive: small dot
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Home = () => {
    const [dogSupplies, setDogSupplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogSupplies = async () => {
      const data = await getPetSupplies() || [];
      const dogs = data.filter(item => item.category === "Dog").slice(0, 5);
      setDogSupplies(dogs);
      setLoading(false);
    };
    fetchDogSupplies();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">

      {/* Hero Section */}
      <HeroSlider />
      {/* Featured Section */}
      <section className="top-category bg-gray- p-6">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Top Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${category.bgColor} rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105`}>
                <div className="text-gray-700 mb-2">{category.icon}</div>
                <p className="text-sm font-medium text-gray-800 text-center">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
             <section className="detial-supplies">
          <div className="w-full bg-gray-100 p-6">
            <h1 className="text-3xl text-center my-8 pb-8 font-bold text-gray-800">
              Dog Supplies
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {dogSupplies.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden relative 
                       transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />

                    {/* Favorite Heart */}
                    <button className="absolute top-3 right-3 text-red-500 bg-white rounded-full p-2 shadow hover:scale-125 transition-transform duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                           2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                           C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                           c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col justify-between h-56">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 mt-2 text-sm">
                        {item.content}
                      </p>
                      <p className="text-xl font-bold text-indigo-600 mt-2">
                        ${item.price}
                      </p>
                    </div>

                    {/* Buy Button */}
                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

    </div>
  );
};

export default Home;