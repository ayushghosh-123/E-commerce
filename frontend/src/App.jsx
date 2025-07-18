import { BrowserRouter, Route,  Routes } from "react-router-dom"
import Layout from "../src/Component/Layout/Layout.jsx"
import Home from "./Pages/Home.jsx"
import Login from "./Pages/Login.jsx"
import { Toaster} from 'sonner';
import Register from "./Pages/register.jsx";
import Profile from "./Pages/profile.jsx";
import Collection from "./Pages/Collection.jsx";
import ProductDetails from "./Component/Products/productDetails.jsx";
import { CartProvider } from "./Context/CardContext.jsx";
import Checkout from "./Component/Cart/checkout.jsx";
import OrderConformationPage from "./Pages/OrderConformationPage.jsx";
import OrderDetailPages from "./Pages/OrderDetailPages.jsx";
import Myorder from "./Pages/Myorder.jsx";
import AdminLayout from "./Component/Admin/AdminLayout.jsx";
// import './App.css'

function App() {


  return (
    <CartProvider>
    <BrowserRouter>
    <Toaster position="" />
      <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='collection/:collection' element={<Collection/>}/>
          <Route path='product/:id' element={<ProductDetails/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='order-confirmation' element={<OrderConformationPage/>}/>
          <Route path='order/:id' element={<OrderDetailPages/>}/>
          <Route path='my-orders' element={<Myorder/>}/>
          <Route path='/admin' element={<AdminLayout/>}/>
          </Route>
          <Route/>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
