import Navbar from "./Navbar";
import Startpage from "../Pages/StartPage";
import Library from "../Pages/Library";
import Everything from "../Pages/Everything";
import MyPage from "../Pages/Mypage";
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
        <Route path="/myPage" element={<MyPage />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
