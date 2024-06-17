import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import Announcement from "./Components/Announcement";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  let isLoggedIn = true;
  return (
    <Router>
      <Announcement />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/" /> : <Signin />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
