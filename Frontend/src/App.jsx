import Navbar from "./Navbar";
import Startpage from "./pages/Startpage"
import Library from "./pages/Library";
import Everything from "./pages/Everything";
import AddAndDelete from "./pages/AddAndDelete";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <div className="selectedPageInfo">
      <Routes>
        <Route path="/" element={<Startpage />}/>
        <Route path="/library" element={<Library />}/>
        <Route path="/alt" element={<Everything />}/>
        <Route path="/addAndDelete" element={<AddAndDelete />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
