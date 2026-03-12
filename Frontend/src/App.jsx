import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-amber-50 text-stone-800 font-light">
      <Navbar />
      <Mainroutes />
    </div>
  );
};

export default App;
