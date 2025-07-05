import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const cart = {
    products: [
        {
            name: "Stylish Jacket",
            size: "M",
            color: "Black",
            price: 120,
            image: "https://picsum.photos/500?random=1"
        },
        {
            name: "casual Snakers",
            size: "42",
            color: "white",
            price: 75,
            image: "https://picsum.photos/500?random=2"
        }
    ],
    totalprice: 195,
}

function Checkout() {
    const navigate = useNavigate();
    const [shippingaddress, setShippingAddress] = useState({
        firstName: "",
        lastname: "",
        address: "",
        city: "",
        postaCode: "",
        country: "",
        phone: ""
    })

  return (
    <div className='grid grid-col-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
        <div className="">
            <h2 className=""></h2>
        </div>
    </div>
  )
}

export default Checkout