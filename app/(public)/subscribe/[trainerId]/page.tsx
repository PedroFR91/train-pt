"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { InitialForm } from "@/components/subscription/InitialForm"
import { SubscriptionSummary } from "@/components/subscription/SubscriptionSummary"

export default function SubscribePage({ params }: { params: { trainerId: string } }) {
  const [step, setStep] = useState("form") // "form" o "summary"
  const [formData, setFormData] = useState(null)
  const [planDetails, setPlanDetails] = useState(null)
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan")

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener los detalles del plan
    // Por ahora, usaremos datos de ejemplo
    setPlanDetails({
      id: planId,
      name: planId === "basic" ? "Plan Básico" : planId === "premium" ? "Plan Premium" : "Plan Elite",
      price: planId === "basic" ? 50 : planId === "premium" ? 100 : 200,
    })
  }, [planId])

  const handleFormSubmit = (data) => {
    setFormData(data)
    setStep("summary")
  }

  if (!planDetails) {
    return <div>Cargando detalles del plan...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Suscripción al Plan de Entrenamiento</h1>
      {step === "form" ? (
        <InitialForm onSubmit={handleFormSubmit} trainerId={params.trainerId} planDetails={planDetails} />
      ) : (
        <SubscriptionSummary formData={formData} trainerId={params.trainerId} planDetails={planDetails} />
      )}
    </div>
  )
}

