"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileImages() {
  const [images, setImages] = useState([
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages([...images, reader.result as string])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imágenes de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Cliente ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
          ))}
        </div>
        <Button variant="outline" className="w-full">
          <label className="cursor-pointer w-full">
            Subir Imagen
            <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
        </Button>
      </CardContent>
    </Card>
  )
}

