import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StartPage from "./pages/StartPage";
import Library from "./pages/Library";
import Everything from "./pages/Everything";
import AddAndDelete from "./pages/AddAndDelete";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="full-page">
      <Navbar />
      <div className="selectedPageInfo">
      <Routes>
        <Route path="/" element={<StartPage />}/>
        <Route path="/library" element={<Library />}/>
        <Route path="/alt" element={<Everything />}/>
        <Route path="/addAndDelete" element={<AddAndDelete />}/>
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
