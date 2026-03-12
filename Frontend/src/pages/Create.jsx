import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { recipecontext } from "../context/RecipeContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const inputClass =
  "w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-stone-400";

const labelClass = "block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5";

const Create = () => {
  const { data, setdata } = useContext(recipecontext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const SubmitHandler = (recipe) => {
    recipe.id = nanoid();
    const copydata = [...data, recipe];
    setdata(copydata);
    localStorage.setItem("recipes", JSON.stringify(copydata));
    toast.success("New recipe created! 🎉");
    reset();
    navigate("/recipes");
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-orange-500 mb-2">
            Kitchen Studio
          </p>
          <h1
            className="text-4xl font-black text-stone-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Create a Recipe
          </h1>
          <p className="text-stone-400 text-sm mt-2">
            Share your culinary creation with the world.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(SubmitHandler)}
          className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 flex flex-col gap-6"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Recipe Title *</label>
              <input
                {...register("title", { required: "Title is required" })}
                className={inputClass}
                placeholder="e.g. Spaghetti Carbonara"
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Chef Name</label>
              <input
                {...register("chef")}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Image URL</label>
              <input
                {...register("image")}
                type="url"
                className={inputClass}
                placeholder="https://..."
              />
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

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              {...register("desc")}
              rows={3}
              className={inputClass}
              placeholder="Describe your dish in a few words..."
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className={labelClass}>Ingredients</label>
            <textarea
              {...register("ingr")}
              rows={3}
              className={inputClass}
              placeholder="flour, eggs, butter, sugar, salt... (comma-separated)"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className={labelClass}>Instructions</label>
            <textarea
              {...register("inst")}
              rows={4}
              className={inputClass}
              placeholder="Preheat oven to 180°C, Mix dry ingredients, Pour batter... (comma-separated)"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200"
            >
              Save Recipe
            </button>
            <button
              type="button"
              onClick={() => navigate("/recipes")}
              className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium px-6 py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

// import { useForm } from "react-hook-form";
// import { nanoid } from "nanoid";
// import { useContext } from "react";
// import { recipecontext } from "../context/RecipeContext";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Create = () => {
//   const navigate = useNavigate();
  

//   const { data, setdata } = useContext(recipecontext);
//   const { register, handleSubmit, reset } = useForm();

//   const SubmitHandler = (recipe) => {
//     recipe.id = nanoid();
//     const copydata = [...data];
//     copydata.push(recipe);
//     setdata(copydata);
//     localStorage.setItem("recipes", JSON.stringify(copydata));

//     toast.success("New Recipe created");
//     reset();
//     navigate("/recipes");
//   };

//   return (
//     <form onSubmit={handleSubmit(SubmitHandler)}>
//       <input
//         className="block border-b outline-0 p-2"
//         {...register("image")}
//         type="url"
//         placeholder="Enter image URL"
//       />

//       <small className="text-red-400">
//         This is how the error should look like
//       </small>

//       <input
//         className="block border-b outline-0 p-2"
//         {...register("title")}
//         type="text"
//         placeholder="Recipe title"
//       />

//       <input
//         className="block border-b outline-0 p-2"
//         {...register("chef")}
//         type="text"
//         placeholder="Chef Name"
//       />

//       <textarea
//         className="block border-b outline-0 p-2"
//         {...register("desc")}
//         placeholder="//Start from here"
//       ></textarea>

//       <textarea
//         className="block border-b outline-0 p-2"
//         {...register("ingr")}
//         placeholder="//write ingredients separated by comma"
//       ></textarea>

//       <textarea
//         className="block border-b outline-0 p-2"
//         {...register("inst")}
//         placeholder="//write instructions separated by comma"
//       ></textarea>

//       <select
//         className="block border-b outline-0 p-2"
//         {...register("category")}
//       >
//         <option value="breakfast">Breakfast</option>
//         <option value="lunch">Lunch</option>
//         <option value="supper">Supper</option>
//         <option value="dinner">Dinner</option>
//       </select>

//       <button className="mt-5 block rounded bg-gray-900 px-4 py-2">
//         Save Recipes
//       </button>
//     </form>
//   );
// };

// export default Create;
