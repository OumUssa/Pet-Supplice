import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [petOpen, setPetOpen] = useState(false);
  const navigate = useNavigate(); // <-- hook

  const DogClick = () => {
    navigate("/DashboardView/tableview", { state: { pet: "Dog" }});
    // localStorage.setItem("pet","Dog") // <-- use navigate()
  };
  const CatClick = () => {
    navigate("/DashboardView/tableview", { state: { pet: "Cat" }});
    // localStorage.setItem("pet","Cat") // <-- use navigate()
  };
  const BirdClick = () => {
    navigate("/DashboardView/tableview", { state: { pet: "Bird" }});
    // localStorage.setItem("pet","Bird") // <-- use navigate()
  };
  const FishClick = () => {
    navigate("/DashboardView/tableview", { state: { pet: "Fish" }});
    // localStorage.setItem("pet","Fish") // <-- use navigate()
  };
  const petSmallClick = () => {
    navigate("/DashboardView/tableview" ,{ state: { pet: "Small Pet" }});
    // localStorage.setItem("pet","Petsmall") // <-- use navigate()
  };  

  const logout=()=>{
    localStorage.removeItem("tokenPet");
    navigate("/")

  }

  return (
<aside className="bg-blue-200 text-white min-h-screen w-100 duration-300 overflow-hidden fixde">


      <div className="mx-auto logo-img p-8">
        <Link to="/">
          <img src="../image/logo.png" alt="Logo" />
        </Link>
      </div>

      <nav className="px-4 space-y-3 ">
        {/* Dashboard */}
        <Link
          to="/DashboardView"
          className="flex items-center gap-3 p-2 hover:bg-blue-300 rounded cursor-pointer mt-3"
        >
          <i className="bi bi-speedometer2 text-xl" />
          Dashboard
        </Link>

        {/* Pets Dropdown */}
        <div>
          {/* Parent Button */}
          <button
            onClick={() => setPetOpen(!petOpen)}
            className="flex items-center w-full gap-3 p-2 text-gray-800 hover:bg-blue-300 rounded cursor-pointer"
          >
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
            }`}
          >
            <li
              onClick={DogClick} // <-- call navigate here
              className="flex items-center p-3 text-gray-500 hover:bg-blue-300 rounded cursor-pointer"
            >
              🐶 Dogs
            </li>

            <li onClick={CatClick} className="flex items-center p-3 text-gray-500 hover:bg-blue-300 rounded cursor-pointer">
              🐱 Cats
            </li>
            <li onClick={BirdClick} className="flex items-center p-3 text-gray-500 hover:bg-blue-300 rounded cursor-pointer">
              🐦 Birds
            </li>
            <li onClick={FishClick} className="flex items-center p-3 text-gray-500 hover:bg-blue-300 rounded cursor-pointer">
              🐠 Fish
            </li>
            <li onClick={petSmallClick} className="flex items-center p-3 text-gray-500 hover:bg-blue-300 rounded cursor-pointer">
              🐹 Small Pets
            </li>
          </ul>
        </div>

        {/* Insert Store */}
        <Link
          to="/DashboardView/insertStore"
          className="flex items-center gap-3 p-2 hover:bg-blue-300 rounded cursor-pointer"
        >
          <i className="bi bi-bag-plus-fill text-xl" />
          Insert Store
        </Link>

        {/* Logout */}
        <button onClick={logout} className="flex items-center bg-red-400 gap-3 p-2 hover:bg-red-800 rounded cursor-pointer mt-5 w-full text-left">
          <i className="bi bi-box-arrow-right text-xl" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
