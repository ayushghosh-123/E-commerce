import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

function PaypalPortal({amount, onSuccess, onError}) {
  return <PayPalScriptProvider options={{"client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID}}>

    <PayPalButtons style={{layout: "vertical"}}
    createOrder={(data, actions) => {
        return actions.order.create({
            purchase_units: [{amount: {value: amount}}]
        })
    }}
    ></PayPalButtons>

    </PayPalScriptProvider>
}

export default PaypalPortal