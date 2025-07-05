import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import PaypalPortal from "./PaypalPortal";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://picsum.photos/500?random=1",
    },
    {
      name: "Casual Sneakers",
      size: "42",
      color: "White",
      price: 75,
      image: "https://picsum.photos/500?random=2",
    },
  ],
  totalprice: 195,
};

function Checkout() {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    country: "",
  });

  const [checkoutId, setCheckoutId] = useState(null);

  const handleCreatedCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSucces = (details) => {
    console.log("Payment succesful", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tight">
      {/* Left Side - Checkout Form */}
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-semibold uppercase mb-6 tracking-wide">
          Checkout
        </h2>

        <form className="space-y-8" onSubmit={handleCreatedCheckout}>
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-medium mb-4">Contact Details</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value="user@example.com"
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-xl font-medium mb-4">Shipping Address</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Address</label>
              <input
                type="text"
                placeholder="123 Main Street"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Phone No</label>
              <input
                type="text"
                placeholder="Phone No"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Country</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                required
              >
                <option>India</option>
                <option>United States</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-6 ">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                {" "}
                Continue to payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4"> Pay with Paypal</h3>
                <PaypalPortal
                  amount={100}
                  onSuccess={handlePaymentSucces}
                  onError={(err) => alert("Payment failed, Try again")}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
        </form>
      </div>

      {/* Right Side - Order Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
        <h3 className="text-3xl font-bold mb-6 text-gray-800">Order Summary</h3>

        <div className="space-y-6">
          {cart.products.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-24 rounded-lg object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-gray-800">
                  ${item.price?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center text-gray-800 font-semibold text-xl border-t pt-4 mt-4">
            <span>Sub-Total</span>
            <span>${cart.totalprice?.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-gray-800 font-semibold text-xl border-t pt-4 mt-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between items-center text-gray-800 font-semibold text-xl border-t pt-4 mt-4">
            <span>Total</span>
            <span>${cart.totalprice?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
