"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, X } from "lucide-react"

export function PhotoUploader() {
  const [photos, setPhotos] = useState([
    { id: 1, name: "Antes.jpg", preview: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Después.jpg", preview: "/placeholder.svg?height=100&width=100" },
    // ... más fotos
  ])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos([...photos, { id: Date.now(), name: file.name, preview: reader.result as string }])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter((photo) => photo.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Fotos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          <Label htmlFor="photo-upload" className="cursor-pointer">
            <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <Upload className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-600">Haz clic para subir o arrastra y suelta</span>
              </span>
            </div>
            <Input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </Label>
        </div>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img src={photo.preview || "/placeholder.svg"} alt={photo.name} className="w-full h-auto rounded-md" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-md">
                  <Button variant="destructive" size="sm" onClick={() => handleDeletePhoto(photo.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mt-1 truncate">{photo.name}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

