
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import AuthProvider from "./context/AuthProvider.jsx"
import PrivateRoute from "./context/PrivateRoute.jsx"
import AboutPage from "./pages/AboutPage"
import AdminCustomers from "./pages/AdminCustomers.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import AdminDeliveries from "./pages/AdminDeliveries.jsx"
import AdminOrders from "./pages/AdminOrders.jsx"
import AdminProducts from "./pages/AdminProducts.jsx"
import AdminSales from "./pages/AdminSales.jsx"
import Cart from "./pages/Cart.jsx"
import ContactPage from "./pages/ContactPage.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import Brownies from "./pages/menu/Brownies.jsx"
import CakeProductDetails from "./pages/menu/CakeProductDetails.jsx"
import Cakes from "./pages/menu/Cakes.jsx"
import Cookies from "./pages/menu/Cookies.jsx"
import Cupcakes from "./pages/menu/Cupcakes.jsx"
import Muffins from "./pages/menu/Muffins.jsx"
import MenuPage from "./pages/MenuPage.jsx"
import Payment from "./pages/Payment.jsx"
import ConfirmPayment from "./pages/PaymentConfirmation.jsx"
import { Profile } from "./pages/ProfilePage.jsx"
import ProfileSetupPage from "./pages/ProfileSetupPage"
import SignupPage from "./pages/SignupPage"


function App() {
  return (
      <div className="App">
        <Router>
        <AuthProvider>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Payment />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/cakes" element={<Cakes />} />
        <Route path="/menu/cupcakes" element={<Cupcakes />} />
        <Route path="/menu/brownies" element={<Brownies />} />
        <Route path="/menu/cookies" element={<Cookies />} />
        <Route path="/menu/muffins" element={<Muffins />} />
        <Route path="/menu/cakes/" element={<Cakes />} />
        <Route path="/menu/cakes/:id" element={<CakeProductDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/paymentconfirmation" element={<ConfirmPayment />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/admin/deliveries" element={<AdminDeliveries/>} />
        <Route path="/admin/sales" element={<AdminSales/>} />
        <Route path="/admin/orders" element={<AdminOrders/>} />
        <Route path="/admin/products" element={<AdminProducts/>} />
        <Route path="/admin/customers" element={<AdminCustomers/>} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
        </AuthProvider>
    </Router>
      </div>
  )
}


export default App;
