import React from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";
const Header = () => {
  const pettoken=localStorage.getItem("tokenPet")
  
  return (
    <header className="bg-white shadow-md">
      <div className="w-full flex items-center justify-between py-4 px-20">
        {/* Logo */}
        <div className="flex items-center justify-center h-24 w-24 border ">
          <a href="" className="w-full h-full relative ">
            <img
              src="/image/logo.png"
              alt="Petzone Logo"
              className="absolute top-1/2 left-0 w-full h-40 object-cover drop-shadow-lg -translate-y-1/2 transition-transform "
            />
          </a>
        </div>

        <div className="flex items-center justify-around space-x-4">
          {/* Right side: search + user links */}
          <div className="flex items-center text-black space-x-2 bg-gray-100 px-3 py-2 rounded-lg transition-all duration-300 focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-400">
            <i className="bi bi-search text-gray-500 text-xl"></i>
            <input
              type="text"
              placeholder="Search for pets"
              aria-label="Search for pets"
              className="bg-gray-100 outline-none text-sm w-75 transition-all duration-300 focus:w-75"
            />
          </div>

          {/* User Links */}
          <div className="flex items-center space-x-4 text-blue-600">
            { !pettoken? <div>
              <Link
                to="/signIn"
                className="text-base btn hvr-underline-from-left py-1">
                Login
              </Link>
              <span className="mx-3">/</span>
              <Link to="/Register" className="hvr-underline-from-left btn py-1">
                register
              </Link>
            </div>:false}
            {pettoken? <div>
              <Link
                to="/DashboardView"
                className="text-base btn hvr-underline-from-left py-1">
                Dashboard
              </Link>
            </div>:false}
            <div className="flex items-center h-auto">
              <a href="#">
                <i className="bi bi-person-fill text-3xl"></i>
              </a>
              <a href="#">
                <i className="bi bi-heart-fill text-2xl mx-5"></i>
              </a>
              <a href="#">
                <i
                  style={{ fontSize: "27px" }}
                  className="bi bi-cart-fill "></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="w-full py-1 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center py-3">
            <ul className="hidden md:flex space-x-25">
              <li>
                <Link to="/"
                  className="text-gray-700 hvr-underline-from-left navbar-link font-extrabold block px-5 py-3 hover:text-blue-600"
                  href="#">
                  Home
                </Link>
              </li>
              <li className="relative group">
                <a
                  href="#"
                  className="py-3 hvr-underline-from-left navbar-link font-extrabold block px-5 hover:text-blue-600">
                  Shop <i className="bi bi-caret-down-fill ms-1"></i>
                </a>

                <ul
                  className="z-1000
      absolute left-0 mt-2 bg-white shadow-lg border rounded-md w-48 pb-2
      opacity-0 invisible
      transform origin-top scale-y-0
      group-hover:opacity-100 group-hover:visible group-hover:scale-y-100
      transition-all duration-400 ease-out
    ">
                  {/* 🐶 Dogs */}
                  <li className="relative group/item">
                    <a className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      🐶 Dogs
                      <i className="bi bi-caret-right-fill"></i>
                    </a>

                    {/* Dogs Submenu */}
                    <ul
                      className="
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Food
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Toys
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Accessories
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Health & Care
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* 🐱 Cats */}
                  <li className="relative group/item">
                    <a className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      🐱 Cats
                      <i className="bi bi-caret-right-fill"></i>
                    </a>

                    <ul
                      className="
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Food
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Toys
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Litter & Hygiene
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Accessories
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* 🐦 Birds */}
                  <li className="relative group/item">
                    <a className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      🐦 Birds
                      <i className="bi bi-caret-right-fill"></i>
                    </a>

                    <ul
                      className="
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Food
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Cages
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Toys
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* 🐠 Fish */}
                  <li className="relative group/item">
                    <a className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      🐠 Fish
                      <i className="bi bi-caret-right-fill"></i>
                    </a>

                    <ul
                      className="
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Fish Food
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Aquariums
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Filters & Pumps
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* 🐹 Small Pets */}
                  <li className="relative group/item">
                    <a className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                      🐹 Small Pets
                      <i className="bi bi-caret-right-fill"></i>
                    </a>

                    <ul
                      className="
          absolute left-44 top-0 ml-1 bg-white shadow-md border rounded-md w-54 py-2
          opacity-0 invisible
          transform origin-top scale-y-0
          group-hover/item:opacity-100 group-hover/item:visible group-hover/item:scale-y-100
          transition-all duration-400 ease-out
        ">
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Food
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Cages
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Bedding
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 hover:bg-gray-100">
                          Toys
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li>
                <a
                  className="text-gray-700 hvr-underline-from-left navbar-link font-extrabold block px-5  py-3 hover:text-blue-600"
                  href="#">
                  Services
                </a>
              </li>
              <li>
                <Link to="/about"
                  className="text-gray-700 hvr-underline-from-left navbar-link font-extrabold block px-5  py-3 hover:text-blue-600"
                  href="#">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact"
                  className="text-gray-700 hvr-underline-from-left navbar-link font-extrabold block px-5  py-3 hover:text-blue-600"
                  href="#">
                  Contact
                </Link>
              </li>
            </ul>

            <button className="md:hidden text-gray-700  py-3 hover:text-blue-600">
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
