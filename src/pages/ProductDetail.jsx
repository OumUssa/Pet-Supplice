import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";
import { fetchPublicProducts, fetchProductComments, addProductComment } from "../API/api";
import { useToast } from "../components/Base/BaseToast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [comments, setComments] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const products = await fetchPublicProducts();
        const found = products.find((p) => p.id === Number(id) || p.title === id);
        setProduct(found || null);
        
        if (found) {
          try {
            const fetchedComments = await fetchProductComments(found.id);
            setComments(fetchedComments || []);
          } catch (e) {
            console.warn("Failed to fetch comments", e);
          }
        }
      } catch (err) {
        console.error("Error loading product", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;
    if (!newReview.comment.trim()) {
      showError("Please write a comment.");
      return;
    }
    setSubmittingReview(true);
    try {
      await addProductComment(product.id, newReview.comment, Number(newReview.rating));
      showSuccess("Review submitted successfully!");
      setNewReview({ rating: 5, comment: "" });
      
      const fetchedComments = await fetchProductComments(product.id);
      setComments(fetchedComments || []);
    } catch (err) {
      console.error(err);
      showError("Failed to submit review. Please ensure you are logged in.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-lg text-slate-500">Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <i className="bi bi-exclamation-circle text-4xl text-rose-400 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
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

  const handleBuy = () => {
    navigate(`/checkout?itemId=${product.id}`, { state: { item: product } });
  };

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

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 grid md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center aspect-square border border-slate-100">
            <img 
              src={product.image || product.image_url} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-emerald-100">
                  {product.category}
                </span>
                {product.Type && (
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-cyan-100">
                    {product.Type}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                {product.title}
              </h1>
              
              {/* Creator Info */}
              {product.creator_id && (
                <div 
                  className="flex items-center gap-2 mt-3 mb-4 p-2.5 rounded-xl border border-slate-100 bg-slate-50 w-fit cursor-pointer hover:bg-slate-100 transition"
                  onClick={() => navigate(`/user/${product.creator_id}`)}
                >
                  {product.creator_avatar ? (
                    <img src={product.creator_avatar} alt={product.creator_name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                      {product.creator_name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-slate-800 leading-none mb-1">Created by {product.creator_name}</p>
                    <p className="text-[10px] text-slate-500 leading-none">
                      {new Date(product.created_at || Date.now()).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-2xl font-bold text-emerald-600 syne">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="mb-8 flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Description</h3>
              <p className="text-slate-600 leading-relaxed">
                {product.description || product.content || "No description available for this product."}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
              <button 
                onClick={handleBuy}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(5,150,105,0.2)] hover:shadow-[0_12px_25px_rgba(5,150,105,0.3)] transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <i className="bi bi-cart-plus text-xl" />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <i className="bi bi-star-fill text-amber-400" /> Product Reviews
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Reviews List */}
            <div className="md:col-span-2 space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                  <i className="bi bi-chat-left-dots text-3xl text-slate-300 mb-2 block" />
                  <p className="text-slate-500 font-medium">No reviews yet. Be the first to review this product!</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {c.user?.name ? c.user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="font-bold text-slate-800">{c.user?.name || "User"}</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(c.created_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex text-amber-400 text-sm mb-2">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`bi bi-star${i < (c.rating || 5) ? '-fill' : ''}`} />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{c.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Write a Review */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-fit">
              <h3 className="font-bold text-slate-900 mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                  <select 
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Terrible</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Comment</label>
                  <textarea 
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Share your thoughts..."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={submittingReview}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
