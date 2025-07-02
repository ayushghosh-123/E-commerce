import { BrowserRouter, Route,  Routes } from "react-router-dom"
import Layout from "../src/Component/Layout/Layout.jsx"
import Home from "./Pages/Home.jsx"
import Login from "./Pages/Login.jsx"
import { Toaster} from 'sonner';
import Register from "./Pages/register.jsx";
import Profile from "./Pages/profile.jsx";
// import './App.css'

function App() {


  return (
    <BrowserRouter>
    <Toaster position="" />
      <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='profile' element={<Profile/>}/>
          </Route>
          <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
