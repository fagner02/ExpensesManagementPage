import "./App.css";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <Link className="tab-link" to="/">
          Home
        </Link>
        <Link className="tab-link" to="/Products">
          Products
        </Link>
        <Link className="tab-link" to="/Categories">
          Categories
        </Link>
      </nav>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Categories" element={<CategoryPage />}></Route>
          <Route path="/Products" element={<ProductPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
