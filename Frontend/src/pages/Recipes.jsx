import { useContext, useState } from "react";
import { recipecontext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const categories = ["all", "breakfast", "lunch", "supper", "dinner"];

const Recipes = () => {
  const { data } = useContext(recipecontext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = data.filter((r) => {
    const matchCat = filter === "all" || r.category === filter;
    const matchSearch =
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.chef?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1
              className="text-4xl font-bold text-stone-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              All Recipes
            </h1>
            <p className="text-stone-400 text-sm mt-1">
              {filtered.length} of {data.length} recipes
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-2.5 shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-stone-400">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="outline-none text-sm text-stone-700 bg-transparent w-40 placeholder:text-stone-400"
                placeholder="Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category pills */}
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs font-medium capitalize px-4 py-2 rounded-full border transition-all duration-200 ${
                  filter === c
                    ? "bg-orange-600 border-orange-600 text-white shadow-md"
                    : "bg-white border-stone-200 text-stone-500 hover:border-orange-400 hover:text-orange-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-28">
            <p className="text-5xl mb-4">🔍</p>
            <h3
              className="text-xl font-bold text-stone-600 mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No recipes found
            </h3>
            <p className="text-sm text-stone-400">
              Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;

// import { useContext } from "react";
// import { recipecontext } from "../context/RecipeContext";
// import RecipeCard from "../components/RecipeCard";



// const Recipes = () => {
//   const { data } = useContext(recipecontext);

//   const renderrecipes = data.map((recipe) => (
//     <RecipeCard key={recipe.id} recipe={recipe} />
//   ));
//   return (
//   <div className="flex flex-wrap">
//     {data.length > 0 ? renderrecipes : "No recipes found!"}
//     </div>
//   );
// };


// export default Recipes;
