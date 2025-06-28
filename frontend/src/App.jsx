import { BrowserRouter, Route,  Routes } from "react-router-dom"
import Layout from "../src/Component/Layout/Layout.jsx"
// import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>}></Route>
          <Route/>
          <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
