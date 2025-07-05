import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

function PaypalPortal({amount, onSuccess, onError}) {
  return <PayPalScriptProvider options={{"client-id": "AbqroYDWF1VhzGDydqvH_RZzr5QiY_K-8LkFNgrKMrWrvyof8r9UoPnL5U-GdU6IDD_0ZKkUi8TDrur4"}}>

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