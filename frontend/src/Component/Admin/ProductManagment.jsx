import React from 'react'
import { Link } from 'react-router-dom'

const ProductManagment = () => {

    const products = [
  {
    "_id": "1",
    "name": "Wireless Bluetooth Headphones",
    "price": 49.99,
    "sku": "WBH-001"
  },
  {
    "_id": "2",
    "name": "Gaming Mouse RGB",
    "price": 29.99,
    "sku": "GM-RGB-002"
  },
  {
    "_id": "3",
    "name": "Mechanical Keyboard",
    "price": 89.99,
    "sku": "MK-003"
  },
  {
    "_id": "4",
    "name": "27-inch 4K Monitor",
    "price": 349.99,
    "sku": "MON-4K-004"
  },
  {
    "_id": "5",
    "name": "USB-C Hub 6-in-1",
    "price": 24.99,
    "sku": "USBC-HUB-005"
  },
  {
    "_id": "6",
    "name": "Portable SSD 1TB",
    "price": 119.99,
    "sku": "PSSD-1TB-006"
  },
  {
    "_id": "7",
    "name": "Noise Cancelling Earbuds",
    "price": 59.99,
    "sku": "NCE-007"
  },
  {
    "_id": "8",
    "name": "Smartwatch Series 5",
    "price": 199.99,
    "sku": "SW-S5-008"
  },
  {
    "_id": "9",
    "name": "Webcam Full HD 1080p",
    "price": 39.99,
    "sku": "WC-HD-009"
  },
  {
    "_id": "10",
    "name": "Ergonomic Office Chair",
    "price": 149.99,
    "sku": "EOC-010"
  }
]

const handleDlete = (id) =>{
    if(window.confirm("Are you sure you want to delete the Products?")){
        console.log("delete Products with id:", id)
    }
}

  return (
    <div className='max-w-7xl mx-auto p-8'>
        <h2 className='text-2xl font-bold mb-8'>Product Managment</h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-gray-500">
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='py-3 px-4'>Name</th>
                        <th className='py-3 px-4'>price</th>
                        <th className='py-3 px-4'>Sku</th>
                        <th className='py-3 px-4'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (products.map((product)=>(
                        <tr key={product._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                            <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{product.name}</td>
                            <td className='p-4'>${product.price}</td>
                            <td className='p-4'>{product.sku}</td>
                            <td className='p-4'>
                                <Link to={`/admin/products/${product._id}/edit`} className='bg-yellow-600 text-white px-2 rounded mr-2 hover:bg-yellow-600'>Edit</Link>
                                <button onClick={()=>handleDlete(product._id)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>Delete</button>
                            </td>
                        </tr>
                    ))): (<tr>
                        <td colSpan={4} className='p-4 text-center text-gray-500'>No problem founds.</td>
                         </tr>)}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductManagment