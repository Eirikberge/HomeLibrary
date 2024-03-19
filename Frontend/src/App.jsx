import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StartPage from "./pages/StartPage";
import Library from "./pages/Library";
import Everything from "./pages/Everything";
import AddAndDelete from "./pages/AddAndDelete";
import LoginRegister from "./pages/LoginRegister";
import MyPage from "./pages/MyPage";
import RequireAuth from "./components/Auth/RequireAuth";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="full-page">
      <Navbar />
      <div className="selectedPageInfo">
        <Routes>
          <Route path="/login" element={<LoginRegister />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<StartPage />} />
            <Route path="/startpage" element={<StartPage />} />
            <Route path="/library" element={<Library />} />
            <Route path="/alt" element={<Everything />} />
            <Route path="/addAndDelete" element={<AddAndDelete />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
