// ─── Fav.jsx ────────────────────────────────────────────────────────────────
import RecipeCard from "../components/RecipeCard";

const Fav = () => {
  const favourite = JSON.parse(localStorage.getItem("fav")) || [];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-stone-900 to-orange-950 py-16 text-center">
        <div className="text-4xl mb-3">♥</div>
        <h1
          className="text-4xl font-black text-amber-50 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Favourites
        </h1>
        <p className="text-amber-50/50 text-sm">
          {favourite.length} saved recipe{favourite.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {favourite.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favourite.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🤍</p>
            <h3
              className="text-xl font-bold text-stone-600 mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No favourites yet
            </h3>
            <p className="text-sm text-stone-400">
              Tap the heart on any recipe to save it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fav;

// import RecipeCard from "../components/RecipeCard";


// const Fav = () => {
  
//      const favourite = JSON.parse(localStorage.getItem("fav")) || [];


//   const renderrecipes = favourite.map((recipe) => (
//     <RecipeCard key={recipe.id} recipe={recipe} />
//   ));
//   return (
//   <div className="flex flex-wrap">
//     {favourite.length > 0 ? renderrecipes : "No Favourite found!"}
//     </div>
//   );
  
// };

// export default Fav
