import React from 'react'
import {Link} from 'react-router-dom'

const AdminHome = () => {
    // Sample data for recent orders
    const orders = [
        {
            _id: 123123,
            user: {
                name: "John Doe",
            },
            totalPrice: 110,
            status: "Processing"
        },
        {
            _id: 456456,
            user: {
                name: "Jane Smith",
            },
            totalPrice: 250,
            status: "Shipped"
        },
        {
            _id: 789789,
            user: {
                name: "Peter Jones",
            },
            totalPrice: 75,
            status: "Delivered"
        }
    ]

    return (
        <div className='max-w-7xl mx-auto p-6'>
            {/* Admin Dashboard Title */}
            <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>

            {/* Dashboard Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Corrected lg:grid-col-3 to lg:grid-cols-3 */}
                {/* Revenue Card */}
                <div className="p-4 shadow-md rounded-lg bg-white"> {/* Added bg-white for clarity */}
                    <h2 className="text-xl font-semibold">
                        Revenue
                    </h2>
                    <p className="text-2xl">$10000</p>
                </div>

                {/* Total Orders Card */}
                <div className="p-4 shadow-md rounded-lg bg-white">
                    <h2 className="text-xl font-semibold">
                        Total Orders {/* Corrected 'Order' to 'Orders' for consistency */}
                    </h2>
                    <p className="text-2xl">200</p>
                    <Link to='/admin/orders' className='text-blue-700 hover:underline'>Manage Orders</Link> {/* Corrected 'Mange' to 'Manage' */}
                </div>

                {/* Total Products Card */}
                <div className="p-4 shadow-md rounded-lg bg-white">
                    <h2 className="text-xl font-semibold">
                        Total Products
                    </h2>
                    <p className="text-2xl">100</p>
                    <Link to='/admin/products' className='text-blue-700 hover:underline'>Manage Products</Link> {/* Corrected 'Mange' to 'Manage' */}
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2> {/* Corrected 'Order' to 'Orders' */}
                <div className="overflow-x-auto">
                    <table className='min-w-full text-left text-gray-500'>
                        <thead className='bg-gray-100 text-xs uppercase text-gray-700'> {/* Corrected 'upercase' to 'uppercase' */}
                            <tr>
                                <th className='py-3 px-4'>Order ID</th>
                                <th className='py-3 px-4'>User</th>
                                <th className='py-3 px-4'>Total Price</th>
                                <th className='py-3 px-4'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                // This is where the fix is: added 'return' for each mapped item
                                orders.map((order) => ( // Renamed 'orders' parameter to 'order' for clarity
                                    <tr key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'> {/* Corrected 'hover:bg-gray50' to 'hover:bg-gray-50' */}
                                        <td className="p-4">{order._id}</td>
                                        <td className="p-4">{order.user.name}</td>
                                        <td className="p-4">${order.totalPrice}</td> {/* Added $ for currency */}
                                        <td className="p-4">{order.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className='p-4 text-center text-gray-500'>
                                        No recent orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminHome