import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [petOpen, setPetOpen] = useState(false);
  const [activePet, setActivePet] = useState("");
  const navigate = useNavigate(); // <-- hook

  const handlePetClick = (pet) => {
    setActivePet(pet);
    navigate("/DashboardView/tableview", { state: { pet } });
  };

  const logout = () => {
    localStorage.removeItem("tokenPet");
    navigate("/");
  };

  return (
    <aside className="bg-cyan-50 border-r border-cyan-200 text-white min-h-screen w-100 duration-300 overflow-hidden fixde">
      <div className="mx-auto logo-img p-8">
        <Link to="/">
          <img src="../image/logo.png" alt="Logo" />
        </Link>
      </div>

      <nav className="px-4 space-y-3 ">
        {/* Dashboard */}
        <Link
          to="/DashboardView"
          className="flex items-center text-cyan-800 gap-3 p-2 hover:bg-cyan-100 rounded cursor-pointer mt-3">
          <i className="bi bi-speedometer2 text-xl" />
          Dashboard
        </Link>

        {/* Pets Dropdown */}
        <div>
          {/* Parent Button */}
          <button
            onClick={() => setPetOpen(!petOpen)}
            className="flex items-center w-full gap-3 p-2 text-cyan-800 hover:bg-cyan-100 rounded cursor-pointer">
            <i className="bi bi-heart text-lg text-gray-700" />
            Pets
            <i
              className={`bi bi-chevron-down ml-auto transform transition-transform duration-300 ${
                petOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown list */}
          <ul
            className={`pl-8 text-black overflow-hidden transition-all duration-300 ${
              petOpen ? "max-h-80" : "max-h-0"
            }`}>
            <li
              onClick={() => handlePetClick("Dog")}
              className={`flex items-center p-3 rounded cursor-pointer transition-colors ${
                activePet === "Dog"
                  ? "bg-cyan-600 text-white font-semibold"
                  : "text-cyan-700 hover:bg-cyan-100"
              }`}>
              Dogs
            </li>

            <li
              onClick={() => handlePetClick("Cat")}
              className={`flex items-center p-3 rounded cursor-pointer transition-colors ${
                activePet === "Cat"
                  ? "bg-cyan-600 text-white font-semibold"
                  : "text-cyan-700 hover:bg-cyan-100"
              }`}>
              Cats
            </li>
            <li
              onClick={() => handlePetClick("Bird")}
              className={`flex items-center p-3 rounded cursor-pointer transition-colors ${
                activePet === "Bird"
                  ? "bg-cyan-600 text-white font-semibold"
                  : "text-cyan-700 hover:bg-cyan-100"
              }`}>
              Birds
            </li>
            <li
              onClick={() => handlePetClick("Fish")}
              className={`flex items-center p-3 rounded cursor-pointer transition-colors ${
                activePet === "Fish"
                  ? "bg-cyan-600 text-white font-semibold"
                  : "text-cyan-700 hover:bg-cyan-100"
              }`}>
              Fish
            </li>
            <li
              onClick={() => handlePetClick("Small Pet")}
              className={`flex items-center p-3 rounded cursor-pointer transition-colors ${
                activePet === "Small Pet"
                  ? "bg-cyan-600 text-white font-semibold"
                  : "text-cyan-700 hover:bg-cyan-100"
              }`}>
              Small Pets
            </li>
          </ul>
        </div>

        {/* Insert Store */}
        <Link
          to="/DashboardView/insertStore"
          className="flex items-center text-cyan-800 gap-3 p-2 hover:bg-cyan-100 rounded cursor-pointer">
          <i className="bi bi-bag-plus-fill text-xl" />
          Insert Store
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center bg-red-400 gap-3 p-2 hover:bg-red-800 rounded cursor-pointer mt-5 w-full text-left">
          <i className="bi bi-box-arrow-right text-xl" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
