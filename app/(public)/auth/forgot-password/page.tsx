"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el email de recuperación
    console.log("Password reset requested for:", email)
    // Simulamos un envío exitoso
    alert("Si existe una cuenta con este email, recibirás instrucciones para restablecer tu contraseña.")
    router.push("/auth/login")
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Recuperar Contraseña</CardTitle>
          <CardDescription>Ingresa tu email para recibir instrucciones</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar Instrucciones
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary">
            Volver al inicio de sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

