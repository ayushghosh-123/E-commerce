import React from 'react'

const checkout = {
  _id: "123223",
  createAt: new Date(), // ✅ Fixed: Use JS Date
  checkoutItems: [      // ✅ Fixed typo: checkOUTiTEMS → checkoutItems
    {
      productId: "1",
      name: "Jacket",
      color: "Black",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=1"
    },
    {
      productId: "2",
      name: "T-Shirt",
      color: "Black",
      size: "M",
      price: 120,
      quantity: 2,
      image: "https://picsum.photos/150?random=2"
    }
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "New York",
    country: "USA"
  }
}

function OrderConfirmationPage() {
  return (
    <div className='max-w-4xl mx-auto bg-white mt-6 p-6 rounded-lg shadow'>
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank you for your orders
      </h1>

      {checkout && (
        <div className='p-6 rounded-lg border'>
          <div className="flex justify-between mb-6">
            {/* Order ID and Date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date: {checkout.createAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Your Items</h3>
            <div className="space-y-4">
              {checkout.checkoutItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border p-4 rounded">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded" />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-600">Color: {item.color}</p>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-800 font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-2">Shipping Address</h3>
            <p>{checkout.shippingAddress.address}</p>
            <p>{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderConfirmationPage
