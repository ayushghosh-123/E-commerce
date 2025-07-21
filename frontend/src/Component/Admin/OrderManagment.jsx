import React, { useState } from 'react'

const OrderManagment = () => {
  const [orders, setOrders] = useState([
    {
      _id: "order_001",
      users: "user_123",
      totalPrice: 2499.99,
      status: "pending"
    },
    {
      _id: "order_002",
      users: "user_456",
      totalPrice: 1599.50,
      status: "shipped"
    },
    {
      _id: "order_003",
      users: "user_789",
      totalPrice: 349.00,
      status: "delivered"
    },
    {
      _id: "order_004",
      users: "user_101",
      totalPrice: 789.75,
      status: "cancelled"
    },
    {
      _id: "order_005",
      users: "user_202",
      totalPrice: 1200.00,
      status: "processing"
    }
  ])

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order._id === orderId ? { ...order, status: newStatus } : order
    )
    setOrders(updatedOrders)
  }

  const handleDelete = (orderId) => {
    const confirmed = window.confirm("Are you sure you want to delete this order?")
    if (confirmed) {
      const updatedOrders = orders.filter(order => order._id !== orderId)
      setOrders(updatedOrders)
    }
  }

  const handleView = (orderId) => {
    const order = orders.find(o => o._id === orderId)
    alert(`Order Details:\n\nID: ${order._id}\nUser: ${order.users}\nTotal: $${order.totalPrice}\nStatus: ${order.status}`)
  }

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-mono">{order._id}</td>
                <td className="py-3 px-4">{order.users}</td>
                <td className="py-3 px-4 font-semibold text-green-600">${order.totalPrice.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleView(order._id)}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManagment
