import "./assets/scss/LJG.scss";
import "./assets/scss/hyunh.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import EventPage from "./screens/EventPage";
import LoadingPage from "./screens/LoadingPage";
import MainPage from "./screens/MainPage";
import MyPage from "./screens/MyPage";
import ProductDetailPage from "./screens/ProductDetailPage";
import ProductPage from "./screens/ProductPage";
import ReviewListPage from "./screens/ReviewListPage";
import ReviewPage from "./screens/ReviewPage";
import ReviewPostPage from "./screens/ReviewPostPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoadingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:prod_idx" element={<ProductDetailPage />} />
          <Route path="/reviews" element={<ReviewPostPage />} />
          <Route path="/reviews/:rev_idx" element={<ReviewPage />} />
          <Route path="/reviewlist" element={<ReviewListPage />} />
          <Route path="/events" element={<EventPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;