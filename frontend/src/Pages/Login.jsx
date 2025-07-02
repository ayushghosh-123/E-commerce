import { useState } from "react"
import {Link} from 'react-router-dom'
import login from '../assets/login.webp'

const Login = ()=> {

  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ fixed casing
    console.log("User Login successfully", { email, password});
    // Add API call or form handling logic here
  };
  return (
    <div className="flex border-2 rounded-2xl mx-4 overflow-hidden my-4">

      {/* make the form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12  ">
        <form onSubmit={handleSubmit} action="" className="w-full max-w-md bg-white p-8 border rounded-lg justify-center mb-6 shadow-sm ">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium ">Rabbit </h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6 text-2xl font-semibold">Enter your username and password to Login</p>
          <div className="mb-4">
            <label  className="block text-sm font-semibold">Email</label>
            <input type="email" value={email} onChange = {(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter your Email"/>
          </div>
           <div className="mb-4">
            <label  className="block text-sm font-semibold">Password</label>
            <input type="password" value={password} onChange = {(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter your Password"/>
          </div>
          <button  type="submit" className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800">Sign In</button>
          <p className="mt-6 text-center text-sm">Don't have an account?{(" ")}
            <Link to="/register" className="text-blue-600">
            Register
            </Link>
          </p>
        </form>
        </div>

        {/* for login page image */}
        <div className="hidden md:block w-1/2 bg-gray-800">
          <div className="h-full flex flex-col justify-center items-center">
            <img src={login} alt="login to account" className="h-[750px] w-full object-cover "/></div>
        </div>
    </div>
  )
}

export default Login