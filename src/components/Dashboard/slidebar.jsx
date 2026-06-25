import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../API/api";

const Sidebar = () => {
  const [petOpen, setPetOpen] = useState(false);
  const [activePet, setActivePet] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const categoryItems = ["Dog", "Cat", "Bird", "Fish", "Small Pet"];

  useEffect(() => {
    const checkRole = async () => {
      try {
        const user = await fetchUserProfile();
        if (user) setUserProfile(user);
        if (user && (user.role_id === 1 || (user.email || "").toLowerCase() === "admin@petstore.com")) {
          setIsSuperAdmin(true);
        }
      } catch (e) {
        // silently fail
      }
    };
    checkRole();
  }, []);

  const handlePetClick = (pet) => {
    setActivePet(pet);
    navigate("/DashboardView/tableview", { state: { pet } });
  };

  const logout = () => {
    localStorage.removeItem("tokenPet");
    navigate("/");
  };

  const navLinkClass =
    "flex items-center gap-3 rounded-xl px-3 py-2.5 !text-white/80 font-medium transition hover:bg-white/15 hover:!text-white [&_i]:!text-white/70 hover:[&_i]:!text-white";

  return (
    <aside className="sticky top-4 h-[calc(100vh-2rem)] w-full max-w-72 overflow-hidden rounded-3xl border border-teal-900/30 bg-gradient-to-b from-teal-700 via-teal-900 to-slate-900 shadow-[0_18px_40px_rgba(15,118,110,0.35)]">
      <div className="border-b border-white/10 px-6 py-6">
        <Link to="/" className="flex flex-col items-center justify-center gap-2">
          <img src="/image/logo.png" alt="Petzone Logo" className="w-60 h-60 object-contain shrink-0 drop-shadow-md" />
          <div className="overflow-hidden w-full text-center">
            <p className="text-xs uppercase tracking-widest !text-teal-300 font-bold truncate">
              {userProfile?.name ? "Welcome Back," : "Pet Store"}
            </p>
            <p className="text-xl font-black !text-white truncate">
              {userProfile?.name || "Admin Panel"}
            </p>
          </div>
        </Link>
      </div>

      <nav className="space-y-1 px-4 py-4 [&_i]:!text-white/70">
        <Link to="/DashboardView" className={navLinkClass}>
          <i className="bi bi-speedometer2 text-lg" />
          Dashboard
        </Link>

        <Link to="/DashboardView/profile" className={navLinkClass}>
          <i className="bi bi-person-badge text-lg" />
          Profile
        </Link>

        <div>
          <button
            onClick={() => setPetOpen(!petOpen)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 !text-white/80 font-medium transition hover:bg-white/15 hover:!text-white">
            <i className="bi bi-shop text-lg" />
            Store
            <i
              className={`bi bi-chevron-down ml-auto transform transition-transform duration-300 ${
                petOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <ul
            className={`overflow-hidden pl-8 transition-all duration-300 ${
              petOpen ? "max-h-96 pt-1" : "max-h-0"
            }`}>
            {categoryItems.map((pet) => (
              <li
                key={pet}
                onClick={() => handlePetClick(pet)}
                className={`mb-1 flex items-center rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-colors ${
                  activePet === pet
                    ? "bg-white/20 !text-white font-semibold"
                    : "!text-white/70 hover:bg-white/10 hover:!text-white"
                }`}>
                {pet === "Small Pet" ? "Small Pets" : `${pet}s`}
              </li>
            ))}
          </ul>
        </div>



        {isSuperAdmin && (
          <>
            <Link to="/DashboardView/insertStore" className={navLinkClass}>
              <i className="bi bi-bag-plus-fill text-lg" />
              Insert Store
            </Link>

            <Link to="/DashboardView/categories" className={navLinkClass}>
              <i className="bi bi-tags-fill text-lg" />
              Manage Categories
            </Link>

            <Link to="/DashboardView/users" className={navLinkClass}>
              <i className="bi bi-people-fill text-lg" />
              User Management
            </Link>

            <Link to="/DashboardView/orders" className={navLinkClass}>
              <i className="bi bi-cart-check-fill text-lg" />
              Order Status Tracking
            </Link>

            <Link to="/DashboardView/tickets" className={navLinkClass}>
              <i className="bi bi-envelope-paper-fill text-lg" />
              Support Tickets
            </Link>
          </>
        )}

        <button
          onClick={logout}
          className="mt-4 flex w-full items-center gap-3 rounded-xl bg-rose-500 px-3 py-2.5 text-left !text-white font-semibold transition hover:bg-rose-600 shadow-lg">
          <i className="bi bi-box-arrow-right text-lg" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
