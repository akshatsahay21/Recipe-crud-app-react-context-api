# 🍳 Recipe CRUD App — React Context API

A full-featured recipe management web app built with React. Create, browse, edit, delete, and favourite recipes — all persisted locally in the browser. Built as a hands-on project to practice React Context API, React Router, React Hook Form, and Tailwind CSS.

---

## 🌐 Live Demo

🔗 [View Live on Vercel](https://recipe-crud-app-react-context-api.vercel.app/)


---

## ✨ Features

- 🗂️ **Browse Recipes** — View all recipes in a responsive card grid
- ➕ **Create Recipe** — Add new recipes with title, chef, image, description, ingredients & instructions
- ✏️ **Edit Recipe** — Update any recipe inline on the detail page
- 🗑️ **Delete Recipe** — Remove recipes permanently
- ❤️ **Favourites** — Save and unsave recipes, persisted in localStorage
- 🔍 **Search & Filter** — Search by name or chef, filter by meal category
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop
- 🔔 **Toast Notifications** — Feedback on every create, update, delete action

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React** | UI library |
| **React Context API** | Global state management for recipes |
| **React Router v6** | Client-side routing & navigation |
| **React Hook Form** | Form handling & validation |
| **Tailwind CSS** | Utility-first styling |
| **Axios** | HTTP client (configured with interceptors) |
| **nanoid** | Unique ID generation for recipes |
| **react-toastify** | Toast notifications |
| **localStorage** | Data persistence across sessions |
| **Vite** | Fast dev server & build tool |

---

## 📁 Project Structure

```
src/
├── context/
│   └── RecipeContext.jsx      # Global state (Context API)
├── pages/
│   ├── Home.jsx               # Landing page with hero + recent recipes
│   ├── Recipes.jsx            # All recipes with search & filter
│   ├── SingleRecipe.jsx       # Recipe detail, edit & delete
│   ├── Create.jsx             # Create new recipe form
│   ├── Fav.jsx                # Saved favourites
│   ├── About.jsx              # About page
│   └── PageNotFound.jsx       # 404 page
├── components/
│   ├── Navbar.jsx             # Sticky navigation bar
│   └── RecipeCard.jsx         # Reusable recipe card component
├── routes/
│   └── Mainroutes.jsx         # All route definitions
├── utils/
│   └── axios.jsx              # Axios instance with interceptors
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash

# Clone the repository
git clone https://github.com/akshatsahay21/recipe-crud-app-react-context-api.git

# Navigate into the project
cd Frontend
cd recipe-crud-app-react-context-api

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🧠 Key Concepts Practiced

- **React Context API** — Lifted recipe state globally so all pages (Recipes, SingleRecipe, Create) can read and update data without prop drilling
- **useContext + useState** — Consumed context in child components cleanly
- **React Hook Form** — Managed controlled forms with `register`, `handleSubmit`, `reset`, and `defaultValues` for pre-filled edit forms
- **React Router v6** — Used `useNavigate`, `useParams`, `NavLink`, nested routes, and a wildcard 404 route
- **localStorage persistence** — Recipes and favourites survive page refreshes
- **Axios interceptors** — Request and response logging configured for future API integration

---

## 📌 Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/recipes` | All Recipes |
| `/recipes/details/:id` | Single Recipe Detail |
| `/create-recipe` | Create New Recipe |
| `/fav` | Favourites |
| `/about` | About |
| `*` | 404 Not Found |

---

## 👨‍💻 Author

Made with ❤️ by **[Akshat Sahay](https://github.com/akshatsahay21)**

---

