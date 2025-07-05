import React, { useEffect, useState } from "react";

function Myorder() {
  const [order, setOrders] = useState([]);

  useEffect(() => {
    //  simulate fetching orders
    setTimeout(() => {
      const mockOrders = [
        {
          order_id: "ORD1001",
          createdAt: "2025-07-04T09:30:00Z",
          shippingAddress: {
            name: "Ayush Kumar",
            street: "123 MG Road",
            city: "Bengaluru",
            postalCode: "560001",
            country: "India",
            phone: "+91-9876543210",
          },
          orderItem: [
            {
              product_id: "P101",
              name: "Wireless Earbuds",
              qty: 2,
              price: 2999,
              image: "https://picsum.photos/200/200?random=1",
            },
            {
              product_id: "P102",
              name: "Bluetooth Speaker",
              qty: 1,
              price: 4999,
              image: "https://picsum.photos/200/200?random=5",
            },
          ],
          totalPrice: 10997,
          isPaid: true,
        },
        {
          order_id: "ORD1002",
          createdAt: "2025-07-02T14:15:00Z",
          shippingAddress: {
            name: "Sneha Sharma",
            street: "456 Park Avenue",
            city: "Mumbai",
            postalCode: "400001",
            country: "India",
            phone: "+91-9123456789",
          },
          orderItem: [
            {
              product_id: "P103",
              name: "Smart Watch",
              qty: 1,
              price: 8999,
              image: "https://picsum.photos/200/200?random=4",
            },
          ],
          totalPrice: 8999,
          isPaid: false,
        },
        {
          order_id: "ORD1003",
          createdAt: "2025-06-28T20:45:00Z",
          shippingAddress: {
            name: "Rahul Verma",
            street: "789 Sector 21",
            city: "Delhi",
            postalCode: "110075",
            country: "India",
            phone: "+91-9988776655",
          },
          orderItem: [
            {
              product_id: "P104",
              name: "Gaming Mouse",
              qty: 3,
              price: 2499,
              image: "https://picsum.photos/200/200?random=2",
            },
            {
              product_id: "P105",
              name: "Mechanical Keyboard",
              qty: 1,
              price: 7499,
              image: "https://picsum.photos/200/200?random=3",
            },
          ],
          totalPrice: 14996,
          isPaid: true,
        },
      ];

      setOrders(mockOrders)
    }, 1000);
  }, []);

  return (
    <div className="max-7xl mx-auto p-4 sm:p-6 ">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
        <div className="relative shadow-md sm:rounded-lgg overflow-hidden">
            <table className="min-w-full text-left text-gray-500">
              <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                  <th className="py-2 px-4 sm:py-3">Image</th>
                  <th className="py-2 px-4 sm:py-3">Order Id</th>
                  <th className="py-2 px-4 sm:py-3">Created</th>
                  <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                  <th className="py-2 px-4 sm:py-3">Items</th>
                  <th className="py-2 px-4 sm:py-3">Proice</th>
                  <th className="py-2 px-4 sm:py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {order.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-400">
                      Loading orders...
                    </td>
                  </tr>
                ) : (
                  order.map((ord) => (
                    <tr key={ord.order_id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-2 px-4">
                        <img
                          src={ord.orderItem[0]?.image}
                          alt={ord.orderItem[0]?.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="py-2 px-4 font-medium">{ord.order_id}</td>
                      <td className="py-2 px-4">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 text-sm">
                        <div>{ord.shippingAddress.name}</div>
                        <div>{ord.shippingAddress.street}, {ord.shippingAddress.city}</div>
                        <div>{ord.shippingAddress.postalCode}, {ord.shippingAddress.country}</div>
                        <div className="text-xs text-gray-400">{ord.shippingAddress.phone}</div>
                      </td>
                      <td className="py-2 px-4">
                        <ul className="list-disc ml-4">
                          {ord.orderItem.map((item) => (
                            <li key={item.product_id}>
                              {item.name} <span className="text-xs text-gray-400">x{item.qty}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-2 px-4 font-semibold">₹{ord.totalPrice.toLocaleString()}</td>
                      <td className="py-2 px-4">
                        {ord.isPaid ? (
                          <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
        </div>
    </div>
  )
}

export default Myorder;
