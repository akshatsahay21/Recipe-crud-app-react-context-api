import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center text-center px-6">
      <h1
        className="text-[9rem] font-black text-stone-200 leading-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        404
      </h1>
      <h2
        className="text-3xl font-bold text-stone-700 mb-3"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Page Not Found
      </h2>
      <p className="text-stone-400 text-sm mb-8">
        The page you're looking for doesn't exist or was moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-orange-600 hover:bg-orange-500 text-white font-medium px-8 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200"
      >
        Go Home
      </button>
    </div>
  );
};

export default PageNotFound;
// import React from 'react'

// const PageNotFound = () => {
//   return (
//     <div>
//       <h1>404 - Page Not Found</h1>
//     </div>
//   )
// }

// export default PageNotFound
