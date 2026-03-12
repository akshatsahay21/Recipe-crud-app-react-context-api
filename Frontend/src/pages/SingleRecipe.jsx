import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const inputClass =
  "w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-stone-400";

const labelClass =
  "block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5";

const FALLBACK =
  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=900&q=80";

const SingleRecipe = () => {
  const { data, setdata } = useContext(recipecontext);
  const navigate = useNavigate();
  const { id } = useParams();
  const recipe = data.find((r) => r.id == id);
  const [editing, setEditing] = useState(false);

  const [favourite, setFavourite] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );
  const isFav = favourite.some((f) => f.id === recipe?.id);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: recipe?.title,
      chef: recipe?.chef,
      image: recipe?.image,
      inst: recipe?.inst,
      desc: recipe?.desc,
      ingr: recipe?.ingr,
      category: recipe?.category,
    },
  });

  useEffect(() => {}, [favourite]);

  if (!recipe) return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center text-stone-400 text-lg">
      Loading...
    </div>
  );

  const ingrs = (recipe.ingr || "").split(",").map((s) => s.trim()).filter(Boolean);
  const insts = (recipe.inst || "").split(",").map((s) => s.trim()).filter(Boolean);

  const UpdateHandler = (updated) => {
    const index = data.findIndex((r) => r.id == id);
    const copy = [...data];
    copy[index] = { ...copy[index], ...updated };
    setdata(copy);
    localStorage.setItem("recipes", JSON.stringify(copy));
    toast.success("Recipe updated!");
    setEditing(false);
  };

  const DeleteHandler = () => {
    const filtered = data.filter((r) => r.id != id);
    setdata(filtered);
    localStorage.setItem("recipes", JSON.stringify(filtered));
    toast.success("Recipe deleted!");
    navigate("/recipes");
  };

  const FavHandler = () => {
    let updated;
    if (isFav) {
      updated = favourite.filter((f) => f.id !== recipe.id);
      toast.info("Removed from favourites");
    } else {
      updated = [...favourite, recipe];
      toast.success("Added to favourites ♥");
    }
    setFavourite(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-amber-50">

      {/* Hero Image */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={recipe.image || FALLBACK}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-900/90" />

        {/* Back button */}
        <button
          onClick={() => navigate("/recipes")}
          className="absolute top-5 left-5 flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-2.5 rounded-xl transition-all hover:bg-white/25"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        {/* Fav button */}
        <button
          onClick={FavHandler}
          className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-110 ${
            isFav
              ? "bg-orange-600 border-orange-600 text-white"
              : "bg-white/15 backdrop-blur-md border-white/20 text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
          <span className="inline-block bg-orange-600 text-white text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            {recipe.category}
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {recipe.title}
          </h1>
          <p className="text-white/70 text-sm flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
              <path d="M6 17h12" />
            </svg>
            by {recipe.chef || "Unknown Chef"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left */}
        <div className="flex flex-col gap-8">
          <div>
            <h2
              className="text-xl font-bold text-stone-800 mb-3 pb-2 border-b-2 border-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About this dish
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed">{recipe.desc}</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              {editing ? "Cancel Edit" : "Edit Recipe"}
            </button>
            <button
              onClick={DeleteHandler}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
              </svg>
              Delete
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-8">
          {/* Ingredients */}
          <div>
            <h2
              className="text-xl font-bold text-stone-800 mb-3 pb-2 border-b-2 border-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ingredients
            </h2>
            <ul className="flex flex-col gap-2">
              {ingrs.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-stone-600 py-1.5 border-b border-stone-100">
                  <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2
              className="text-xl font-bold text-stone-800 mb-3 pb-2 border-b-2 border-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Instructions
            </h2>
            <ol className="flex flex-col gap-4">
              {insts.map((step, i) => (
                <li key={i} className="flex gap-4 items-start text-sm text-stone-600 leading-relaxed">
                  <span className="w-7 h-7 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Edit Panel */}
      {editing && (
        <div className="border-t border-stone-200 bg-stone-50">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <h3
              className="text-2xl font-bold text-stone-800 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Edit Recipe
            </h3>
            <form onSubmit={handleSubmit(UpdateHandler)} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Title</label>
                  <input {...register("title")} className={inputClass} placeholder="Recipe title" />
                </div>
                <div>
                  <label className={labelClass}>Chef</label>
                  <input {...register("chef")} className={inputClass} placeholder="Chef name" />
                </div>
                <div>
                  <label className={labelClass}>Image URL</label>
                  <input {...register("image")} type="url" className={inputClass} placeholder="https://..." />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select {...register("category")} className={inputClass}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="supper">Supper</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea {...register("desc")} rows={3} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Ingredients (comma-separated)</label>
                <textarea {...register("ingr")} rows={3} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Instructions (comma-separated)</label>
                <textarea {...register("inst")} rows={4} className={inputClass} />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-7 py-3 rounded-xl transition-all duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 font-medium px-6 py-3 rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;

// import { useContext } from "react";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { recipecontext } from "../context/RecipeContext";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useEffect } from "react";
// import { useState } from "react";

// const SingleRecipe = () => {
//   const { data, setdata } = useContext(recipecontext);
//   const navigate = useNavigate();
//   const params = useParams();
//   const recipe = data.find((recipe) => params.id == recipe.id);

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       title: recipe?.title,
//       chef: recipe?.chef,
//       image: recipe?.image,
//       inst: recipe?.inst,
//       desc: recipe?.desc,
//       ingr: recipe?.ingr,
//     },
//   });

//   const UpdateHandler = (recipe) => {
//     const index = data.findIndex((recipe) => params.id == recipe.id);
//     const copydata = [...data];
//     copydata[index] = { ...copydata[index], ...recipe };
//     setdata(copydata);
//     localStorage.setItem("recipes", JSON.stringify(copydata));

//     toast.success("Recipe updated");
//   };

//   const DeleteHandler = () => {
//     const filterdata = data.filter((r) => r.id != params.id);
//     setdata(filterdata);
//     localStorage.setItem("recipes", JSON.stringify(filterdata));

//     toast.success("recipe deleted!");
//     navigate("/Recipes");
//   };

//  const [favourite, setFavourite] = useState(
//   JSON.parse(localStorage.getItem("fav")) || []
//  );
   
//   const FavHandler = () => {
//     let copyfav = [...favourite];
//     copyfav.push(recipe);
//     setFavourite(copyfav);
//     localStorage.setItem("fav", JSON.stringify(copyfav));
//   };
//     const UnFavHandler = () => {
//       const filterfav = favourite.filter((f) => f.id != recipe.id);
//       localStorage.setItem("fav", JSON.stringify(filterfav));
//       setFavourite(filterfav);
//     };
//      useEffect(() => {
//     console.log("SingleRecipe component mounted");

//     return () => {
//       console.log("SingleRecipe component unmounted");
//     };
//   }, [favourite]);


//   return recipe ? (
//     <div className="w-full flex">
      
//       <div className="relative left w-1/2 p-10">
      
// {favourite.find((r) => r.id == recipe.id) ? (
//   <i
//     onClick={UnFavHandler}
//     className="right-[5%] absolute text-3xl text-red-400 ri-heart-fill"
//   ></i>
// ) : (
//   <i
//     onClick={FavHandler}
//     className="right-[5%] absolute text-3xl text-red-400 ri-heart-line"
//   ></i>
// )}


//         <h1 className="text-5xl font-black">{recipe.title}</h1>
//         <img className="h-[20vh]" src={recipe.image} alt="" />
//         <h1>{recipe.chef}</h1>
//         <h1>{recipe.desc}</h1>
//       </div>

//       <form className="w-1/2 p-2" onSubmit={handleSubmit(UpdateHandler)}>
//         <input
//           className="block border-b outline-0 p-2"
//           {...register("image")}
//           type="url"
//           placeholder="Enter image URL"
//         />

//         <small className="text-red-400">
//           This is how the error should look like
//         </small>

//         <input
//           className="block border-b outline-0 p-2"
//           {...register("title")}
//           type="text"
//           placeholder="Recipe title"
//         />

//         <input
//           className="block border-b outline-0 p-2"
//           {...register("chef")}
//           type="text"
//           placeholder="Chef Name"
//         />

//         <textarea
//           className="block border-b outline-0 p-2"
//           {...register("desc")}
//           placeholder="//Start from here"
//         ></textarea>

//         <textarea
//           className="block border-b outline-0 p-2"
//           {...register("ingr")}
//           placeholder="//write ingredients separated by comma"
//         ></textarea>

//         <textarea
//           className="block border-b outline-0 p-2"
//           {...register("inst")}
//           placeholder="//write instructions separated by comma"
//         ></textarea>

//         <select
//           className="block border-b outline-0 p-2"
//           {...register("category")}
//         >
//           <option value="breakfast">Breakfast</option>
//           <option value="lunch">Lunch</option>
//           <option value="supper">Supper</option>
//           <option value="dinner">Dinner</option>
//         </select>

//         <button className="mt-5 block rounded bg-blue-900 px-4 py-2">
//           Update Recipe
//         </button>
//         <button
//           onClick={DeleteHandler}
//           className="mt-5 block rounded bg-red-800 px-4 py-2"
//         >
//           Delete Recipe
//         </button>
//       </form>
//     </div>
//   ) : (
//     "Loading..."
//   );
// };

// export default SingleRecipe;
