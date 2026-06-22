import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById, fetchPublicProducts } from "../API/api";
import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";

export default function PublicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const userData = await fetchUserById(id);
        setUser(userData.user || userData);

        const allProducts = await fetchPublicProducts();
        // Filter products to only those created by this user
        const userProducts = allProducts.filter((p) => p.creator_id === Number(id));
        setProducts(userProducts);
      } catch (err) {
        console.error(err);
        setError("User not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-lg text-slate-500">Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <i className="bi bi-exclamation-circle text-4xl text-rose-400 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800">Profile Not Found</h2>
          <p className="text-slate-500 mt-2">{error}</p>
          <button 
            onClick={() => navigate("/shop")} 
            className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
          >
            Back to Shop
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 transition"
        >
          <i className="bi bi-arrow-left" /> Back
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-5xl font-black text-emerald-700">
                {user.name?.charAt(0)?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{user.name}</h1>
            <p className="text-slate-500 mb-4 flex items-center justify-center md:justify-start gap-2">
              <i className="bi bi-calendar3" />
              Joined {new Date(user.created_at || Date.now()).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {user.company_name && (
                <div className="bg-slate-100 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <i className="bi bi-building text-emerald-600" /> {user.company_name}
                </div>
              )}
              {user.location && (
                <div className="bg-slate-100 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <i className="bi bi-geo-alt text-emerald-600" /> {user.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User's Products */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-800">Products by {user.name}</h2>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full">
            {products.length} Items
          </span>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <i className="bi bi-box-seam text-4xl text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">This user hasn't posted any products yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((item) => (
              <article
                key={item.id}
                className="rounded-[18px] border-[1.5px] border-slate-200 bg-white overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:shadow-xl transition-all"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="relative h-[188px] overflow-hidden">
                  <img
                    src={item.image || item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  <span className="absolute left-2.5 bottom-2.5 text-[0.68rem] font-bold tracking-wider uppercase bg-white/95 text-slate-800 rounded-md px-2.5 py-1 border border-white/60 shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-3.5 pb-4">
                  <h3 className="m-0 mb-1 text-[0.875rem] font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="m-0 mb-2 text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">
                    {item.Type || "Pet Supply"}
                  </p>
                  <p className="m-0 mb-3 text-[0.78rem] text-slate-500 leading-relaxed line-clamp-2">
                    {item.description || item.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="syne text-[1.1rem] font-bold text-emerald-600">
                      ${Number(item.price).toFixed(2)}
                    </span>
                    <button 
                      className="rounded-lg px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition transform hover:-translate-y-px"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/checkout?itemId=${item.id}`, { state: { item } });
                      }}
                    >
                      <i className="bi bi-cart-plus mr-1" /> Buy
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
