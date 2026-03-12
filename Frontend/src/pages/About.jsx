const About = () => {
  const features = [
    { icon: "🍳", title: "Create", desc: "Add your own recipes with photos, ingredients & steps" },
    { icon: "❤️", title: "Favourite", desc: "Save the recipes you love to your personal collection" },
    { icon: "✏️", title: "Edit", desc: "Update and improve your recipes at any time" },
    { icon: "🗂️", title: "Organise", desc: "Filter by meal type to find exactly what you need" },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-3xl mx-auto px-6 py-16">

        <p className="text-xs font-medium tracking-[0.2em] uppercase text-orange-500 mb-4">
          Our Story
        </p>

        <h1
          className="text-5xl font-black text-stone-800 leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Where <em className="text-orange-500 not-italic italic">flavour</em>
          <br />meets craft.
        </h1>

        <p className="text-stone-500 leading-relaxed mb-5 text-base">
          Saveur is a personal recipe management app built with React. Organise
          your culinary creations, save your favourites, and rediscover the joy
          of cooking one recipe at a time.
        </p>

        <p className="text-stone-400 leading-relaxed text-sm mb-12">
          Built with React, React Context, React Hook Form, React Router, and
          styled with Tailwind CSS. Data persists locally via localStorage.
        </p>

        {/* Divider */}
        <div className="w-16 h-1 bg-orange-500 rounded-full mb-12" />

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-stone-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <h4
                className="font-bold text-stone-800 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {title}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

// import React from 'react'

// const About = () => {
//   return (
//     <div>
//       About
//     </div>
//   )
// }

// export default About
