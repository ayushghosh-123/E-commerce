// Import necessary modules and components
import { BrowserRouter, Route, Routes } from "react-router-dom"; // React Router for navigation
import { Toaster } from 'sonner'; // For displaying toast notifications

// Import Layout Components
import Layout from "./Component/Layout/Layout.jsx"; // Main public layout
import AdminLayout from "./Component/Admin/AdminLayout.jsx"; // Admin dashboard layout

// Import Page Components
import Home from "./Pages/Home.jsx"; // Homepage
import Login from "./Pages/Login.jsx"; // Login page
import Register from "./Pages/register.jsx"; // Registration page
import Profile from "./Pages/profile.jsx"; // User profile page
import Collection from "./Pages/Collection.jsx"; // Product collection page
import ProductDetails from "./Component/Products/productDetails.jsx"; // Individual product detail page
import Checkout from "./Component/Cart/checkout.jsx"; // Checkout page
import OrderConformationPage from "./Pages/OrderConformationPage.jsx"; // Order confirmation page
import OrderDetailPages from "./Pages/OrderDetailPages.jsx"; // Specific order details page
import Myorder from "./Pages/Myorder.jsx"; // User's order history page

// Import Context Providers
import { CartProvider } from "./Context/CardContext.jsx"; // Provides shopping cart context
import AdminHome from "./Pages/AdminHome.jsx";
import Usermanagment from "./Component/Admin/Usermanagment.jsx";

// Main App component
function App() {
  return (
    // Provides cart state to all children
    <CartProvider>
      {/* Enables client-side routing */}
      <BrowserRouter>
        {/* Global toast notification system */}
        <Toaster position="bottom-right" richColors />

        {/* Defines application routes */}
        <Routes>
          {/* Public routes using the main Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> {/* Home page */}
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route path='my-orders' element={<Myorder />} />
            <Route path='order/:id' element={<OrderDetailPages />} />
            <Route path='collection/:collection' element={<Collection />} />
            <Route path='product/:id' element={<ProductDetails />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='order-confirmation' element={<OrderConformationPage />} />
          </Route>

          {/* Admin routes using the AdminLayout */}
          <Route path='/admin' element={<AdminLayout />}>
            {/* Admin-specific sub-routes go here */}
            <Route index element={<AdminHome/>} />
             <Route path='users' element={<Usermanagment/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
