"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

export default function VerifyPage() {
  const [code, setCode] = useState("")
  const router = useRouter()
  const { user, verifyAccount } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await verifyAccount(code)
      // La redirección se manejará en el contexto de autenticación
    } catch (error) {
      console.error("Error durante la verificación:", error)
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verificar Cuenta</CardTitle>
          <CardDescription>Ingresa el código enviado a tu teléfono</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de verificación</Label>
              <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">
              Verificar
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full">
            Reenviar código
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

