import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const { data } = useContext(recipecontext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-orange-950 overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(234,88,12,0.18),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-amber-400 mb-5">
            Crafted with love · Saveur Recipe App
          </p>

          <h1
            className="text-5xl md:text-7xl font-black text-amber-50 leading-[1.05] mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Every dish tells
            <br />
            <em className="text-orange-400 not-italic italic">a story.</em>
          </h1>

          <p className="text-lg text-amber-50/60 font-light max-w-md mx-auto mb-10">
            Discover, create, and savour handcrafted recipes from kitchens around the world.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/recipes")}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-600/30"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Browse Recipes
            </button>
            <button
              onClick={() => navigate("/create-recipe")}
              className="border border-amber-50/30 hover:border-amber-50 text-amber-50 hover:bg-white/10 font-medium px-7 py-3.5 rounded-xl transition-all duration-200"
            >
              Create Your Own
            </button>
          </div>
        </div>
      </div>

      {/* Recent Recipes */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="text-3xl font-bold text-stone-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Recently Added
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              {data.length} recipe{data.length !== 1 ? "s" : ""} in your collection
            </p>
          </div>
          <button
            onClick={() => navigate("/recipes")}
            className="text-sm text-orange-600 hover:text-orange-500 font-medium transition-colors"
          >
            View all →
          </button>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.slice(0, 4).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-stone-400">
            <p className="text-5xl mb-4">🍳</p>
            <h3
              className="text-xl font-bold text-stone-600 mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No recipes yet
            </h3>
            <p className="text-sm">Start by creating your first recipe.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

// import React, { useEffect } from "react";
// import axios from "../utils/axios";

// const Home = () => {
//   const getproduct = async () => {
//     try {
//       const response = await axios.get("https://fakestoreapi.com/products");
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getproduct();
//   }, []);

//   return (
//     <div>
//       <h1>Home</h1>
//       <button onClick={getproduct}>Get Product</button>
//     </div>
//   );
// };

// export default Home;
