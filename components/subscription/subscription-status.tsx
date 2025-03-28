"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export function SubscriptionStatus() {
  const [isActive, setIsActive] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Suscripción</CardTitle>
        <CardDescription>Información sobre tu suscripción actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Plan Premium</p>
            <p className="text-sm text-muted-foreground">Renovación: 15/07/2023</p>
          </div>
          <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? (
              <>
                <CheckCircle className="mr-1 h-4 w-4" /> Activa
              </>
            ) : (
              <>
                <XCircle className="mr-1 h-4 w-4" /> Inactiva
              </>
            )}
          </Badge>
        </div>
        <div className="mt-4">
          <Button variant={isActive ? "destructive" : "default"} onClick={() => setIsActive(!isActive)}>
            {isActive ? "Cancelar Suscripción" : "Reactivar Suscripción"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

