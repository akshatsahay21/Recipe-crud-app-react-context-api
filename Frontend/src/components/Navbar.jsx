import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-stone-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        
        {/* Brand */}
        <div
          onClick={() => navigate("/")}
          className="font-serif text-2xl font-black text-amber-50 tracking-tight cursor-pointer select-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Saveur<span className="text-orange-400 italic">.</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1">
          {[
            { to: "/", label: "Home", end: true },
            { to: "/recipes", label: "Recipes" },
            { to: "/fav", label: "Favourites" },
            { to: "/about", label: "About" },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-light tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-orange-400 bg-white/10 font-medium"
                    : "text-amber-50/70 hover:text-amber-50 hover:bg-white/10"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <button
            onClick={() => navigate("/create-recipe")}
            className="ml-2 flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-600/30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Recipe
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// import { NavLink } from "react-router-dom"








// const Navbar = () => {
//   return (
//     <div className="flex items-center justify-center gap-x-10 text-sm mb-10">
//       <NavLink className={(e) => e.isActive ? "text-red-300" : ""} to="/">
//         Home
//       </NavLink>
//       <NavLink className={(e) => e.isActive ? "text-red-300" : ""} to="/recipes">
//         Recipes
//       </NavLink>
//        <NavLink className={(e) => e.isActive ? "text-red-300" : ""} to="/about">
//         About
//       </NavLink>
//       <NavLink className={(e) => e.isActive ? "text-red-300" : ""} to="/create-recipe">
//         Create Recipe
//       </NavLink>
//        <NavLink className={(e) => e.isActive ? "text-red-300" : ""} to="/fav">
//         Favorites
//       </NavLink>
      
      
//     </div>
//   );
// };

// export default Navbar
