"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export function PaymentRedirect({ amount }) {
  useEffect(() => {
    // Aquí podrías iniciar el proceso de redirección a Stripe
    console.log("Redirigiendo a Stripe para pago de €", amount)
  }, [amount])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Redirigiendo al pago</h2>
        <p className="mb-4">Estás siendo redirigido a Stripe para completar el pago de €{amount}.</p>
        <Button onClick={() => (window.location.href = "https://stripe.com")}>Continuar al pago</Button>
      </div>
    </div>
  )
}

