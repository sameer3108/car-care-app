import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FAQ from "./components/FAQ";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Vendors from "./pages/Vendors"
import VendorInformation from "./pages/VendorInformation";
import Profile from "./components/Profile";
import VendorReview from "./pages/VendorReview";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Blogs from "./pages/Blogs";
import PurchaseOrder from "./pages/PurchaseOrder";
import WriteBlog from "./pages/WriteBlog";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <NavBar></NavBar>
        </header>
      {/* <Router> */}
        <Routes>
          <Route path="/faq" element={<FAQ />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<VendorInformation />} />
          <Route path="/purchase-order/:id" element={<PurchaseOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/review" element={<Reviews />} />

          <Route path="/reviewVendor" element={<VendorReview />} />

          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<RegistrationPage/>} />

          <Route path="/login" element={<LoginPage/>} />

          <Route path="/blogs" element={<Blogs/>} />
            
          <Route path="/writeBlog" element={<WriteBlog/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
