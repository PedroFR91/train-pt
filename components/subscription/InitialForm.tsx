"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InitialForm({ onSubmit, trainerId, planDetails }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    goals: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Plan Seleccionado</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Plan:</strong> {planDetails.name}
          </p>
          <p>
            <strong>Precio:</strong> €{planDetails.price}/mes
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Edad
          </label>
          <Input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Altura (cm)
          </label>
          <Input type="number" id="height" name="height" value={formData.height} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Peso (kg)
          </label>
          <Input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
            Objetivos de entrenamiento
          </label>
          <Textarea id="goals" name="goals" value={formData.goals} onChange={handleChange} required />
        </div>
        <Button type="submit">Enviar Solicitud</Button>
      </form>
    </div>
  )
}

