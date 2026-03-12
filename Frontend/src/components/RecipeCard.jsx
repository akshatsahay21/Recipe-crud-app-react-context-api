import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ChefIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
    <path d="M6 17h12" />
  </svg>
);

const FALLBACK =
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&q=70";

const categoryColors = {
  breakfast: "bg-amber-700",
  lunch: "bg-green-800",
  supper: "bg-indigo-800",
  dinner: "bg-stone-800",
};

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );
  const isFav = favourite.some((f) => f.id === recipe.id);

  const toggleFav = (e) => {
    e.stopPropagation();
    let updated;
    if (isFav) {
      updated = favourite.filter((f) => f.id !== recipe.id);
    } else {
      updated = [...favourite, recipe];
    }
    setFavourite(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <div
      onClick={() => navigate(`/recipes/details/${recipe.id}`)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image || FALLBACK}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 ${
            categoryColors[recipe.category] || "bg-stone-800"
          } text-amber-50 text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full`}
        >
          {recipe.category}
        </span>

        {/* Fav button */}
        <button
          onClick={toggleFav}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 ${
            isFav
              ? "bg-orange-600 text-white"
              : "bg-white text-orange-600 hover:bg-orange-50"
          }`}
        >
          <HeartIcon filled={isFav} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3
          className="text-lg font-bold text-stone-800 leading-snug mb-1.5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {recipe.title}
        </h3>
        <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-3">
          <ChefIcon />
          <span>{recipe.chef || "Unknown Chef"}</span>
        </div>
        <p className="text-sm text-stone-500 leading-relaxed line-clamp-2">
          {recipe.desc}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;

// import { Link } from "react-router-dom";

// const RecipeCard = (props) => {

//   const { id, image, title, desc, chef } = props.recipe ;

//   return(
//      <Link
//      to={`/recipes/details/${id}`}
//       className="duration-150 hover:scale-105 mr-3 mb-3 block w-[23vw] rounded overflow-hidden shadow">
//      <img className="object-cover w-full h-[20vh]" src={image} alt="" />
//      <h1 className="px-2 mt-2 font-black">{title}</h1>
//      <small className="px-2 text-red-400">{chef}</small>
//      <p className="px-2 pb-3">
//         {desc.slice(0, 100)}...{" "}
//         <small className="text-blue-400">more</small>
//      </p>
//      </Link> );
// };

// export default RecipeCard;
 