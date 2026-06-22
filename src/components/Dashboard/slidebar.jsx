import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../API/api";

const Sidebar = () => {
  const [petOpen, setPetOpen] = useState(false);
  const [activePet, setActivePet] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();

  const categoryItems = ["Dog", "Cat", "Bird", "Fish", "Small Pet"];

  useEffect(() => {
    const checkRole = async () => {
      try {
        const user = await fetchUserProfile();
        if (user && (user.role_id === 2 || (user.email || "").toLowerCase() === "admin@petstore.com")) {
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

  return (
    <aside className="sticky top-4 h-[calc(100vh-2rem)] w-full max-w-72 overflow-hidden rounded-3xl border border-cyan-100 bg-linear-to-b from-white to-cyan-50 shadow-[0_18px_40px_rgba(15,118,110,0.14)]">
      <div className="border-b border-cyan-100 px-6 py-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-600 text-white">
            <i className="bi bi-shield-check" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-teal-700">
              Pet Store
            </p>
            <p className="text-base font-semibold text-slate-900">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      <nav className="space-y-2 px-4 py-4">
        <Link
          to="/DashboardView"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-cyan-900 transition hover:bg-cyan-100">
          <i className="bi bi-speedometer2 text-lg" />
          Dashboard
        </Link>

        <Link
          to="/DashboardView/profile"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-cyan-900 transition hover:bg-cyan-100">
          <i className="bi bi-person-badge text-lg" />
          Profile
        </Link>

        <div>
          <button
            onClick={() => setPetOpen(!petOpen)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-cyan-900 transition hover:bg-cyan-100">
            <i className="bi bi-heart text-lg text-cyan-700" />
            Pets
            <i
              className={`bi bi-chevron-down ml-auto transform transition-transform duration-300 ${
                petOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <ul
            className={`overflow-hidden pl-8 text-black transition-all duration-300 ${
              petOpen ? "max-h-96 pt-2" : "max-h-0"
            }`}>
            {categoryItems.map((pet) => (
              <li
                key={pet}
                onClick={() => handlePetClick(pet)}
                className={`mb-1 flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                  activePet === pet
                    ? "bg-cyan-600 text-white font-semibold"
                    : "text-cyan-700 hover:bg-cyan-100"
                }`}>
                {pet === "Small Pet" ? "Small Pets" : `${pet}s`}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/DashboardView/insertStore"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-cyan-900 transition hover:bg-cyan-100">
          <i className="bi bi-bag-plus-fill text-lg" />
          Insert Store
        </Link>

        {isSuperAdmin && (
          <>
            <Link
              to="/DashboardView/categories"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-cyan-900 transition hover:bg-cyan-100">
              <i className="bi bi-tags-fill text-lg" />
              Manage Categories
            </Link>
            
            <Link
              to="/DashboardView/users"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-cyan-900 transition hover:bg-cyan-100">
              <i className="bi bi-people-fill text-lg" />
              User Management
            </Link>
          </>
        )}

        <button
          onClick={logout}
          className="mt-6 flex w-full items-center gap-3 rounded-xl bg-rose-500 px-3 py-2.5 text-left text-white transition hover:bg-rose-600">
          <i className="bi bi-box-arrow-right text-lg" />
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
