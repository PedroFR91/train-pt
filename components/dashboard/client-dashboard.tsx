"use client"

import { useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { ClientProfile } from "./client-profile"
import { ClientDiet } from "./client-diet"
import { ClientMeasurements } from "./client-measurements"
import { ClientReviews } from "./client-reviews"
import { ClientPhotos } from "./client-photos"
import { ClientForms } from "./client-forms"
import { ClientSummaryCards } from "./client-summary-cards"

export function ClientDashboard() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "profile"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard del Cliente</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Última actualización: 15/03/2025
          </Badge>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <ClientSummaryCards />

      {/* Contenido principal */}
      <div>
        {activeTab === "profile" && <ClientProfile />}
        {activeTab === "diet" && <ClientDiet />}
        {activeTab === "measurements" && <ClientMeasurements />}
        {activeTab === "forms" && <ClientForms />}
        {activeTab === "reviews" && <ClientReviews />}
        {activeTab === "photos" && <ClientPhotos />}
      </div>
    </div>
  )
}

