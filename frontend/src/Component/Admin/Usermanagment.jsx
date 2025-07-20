import React, { useState } from 'react'

const Usermanagment = () => {

  const users = {
      name: "John Doe",
      email: "John@example.com",
      role: "admin"
  }

  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      password: "",
      role: "Customer"    
    }
  )

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
    setFormData({
      name: "",
      email: "",
      passsword: "",
      role: "Customer"
    })
  }

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className="text-2xl font-bold mb-6">User Managment</h2>
      {/* Add New User From */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name='name' value={formData.name} onChange={handleChange} className='w-full p-2 border rounded' />
          </div>
           <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleChange} className='w-full p-2 border rounded' />
          </div>
           <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleChange} className='w-full p-2 border rounded' />
          </div>
           <div className="mb-4">
            <label className="block text-gray-700">Role</label>
           <select name="role" value={formData.role} onChange={handleChange} className='w-full p-2 border rounded'>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
           </select>
          </div>
           <div className="mb-4">
              <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600' >Add User</button>
          </div>
        </form>
      </div>

      {/* user list Managment */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='py-3 px-4'>Name</th>
              <th className='py-3 px-4'>Email</th>
              <th className='py-3 px-4'>Role</th>
              <th className='py-3 px-4'>Action</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

  )
}

export default Usermanagment