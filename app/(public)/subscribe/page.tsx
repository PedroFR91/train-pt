"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const steps = ["Selección de Plan", "Formulario Inicial", "Pago"]

export default function SubscribePage() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Suscripción a Entrenamiento Personal</h1>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            <span className="ml-2">{step}</span>
            {index < steps.length - 1 && <div className="w-16 h-1 bg-muted mx-2" />}
          </div>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep]}</CardTitle>
          <CardDescription>Completa la información necesaria para tu suscripción</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 0 && <PlanSelection />}
          {currentStep === 1 && <InitialForm />}
          {currentStep === 2 && <PaymentForm />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 0}>
            Anterior
          </Button>
          <Button onClick={handleNextStep} disabled={currentStep === steps.length - 1}>
            {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function PlanSelection() {
  return (
    <div className="space-y-4">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="basic">Básico - €29.99/mes</SelectItem>
          <SelectItem value="premium">Premium - €49.99/mes</SelectItem>
          <SelectItem value="elite">Elite - €79.99/mes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function InitialForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="height">Altura (cm)</Label>
        <Input id="height" type="number" />
      </div>
      <div>
        <Label htmlFor="weight">Peso (kg)</Label>
        <Input id="weight" type="number" />
      </div>
      <div>
        <Label htmlFor="goals">Objetivos de entrenamiento</Label>
        <Textarea id="goals" />
      </div>
    </div>
  )
}

function PaymentForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="card-number">Número de tarjeta</Label>
        <Input id="card-number" placeholder="1234 5678 9012 3456" />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="expiry">Fecha de expiración</Label>
          <Input id="expiry" placeholder="MM/YY" />
        </div>
        <div className="flex-1">
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" placeholder="123" />
        </div>
      </div>
    </div>
  )
}

