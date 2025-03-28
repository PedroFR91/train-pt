"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Upload } from "lucide-react"

export function ClientPhotos() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const photoSets = [
    {
      date: "2024-10-01",
      photos: [
        { view: "Frente", url: "/placeholder.svg?height=400&width=300" },
        { view: "Perfil", url: "/placeholder.svg?height=400&width=300" },
        { view: "Espalda", url: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      date: "2024-11-01",
      photos: [
        { view: "Frente", url: "/placeholder.svg?height=400&width=300" },
        { view: "Perfil", url: "/placeholder.svg?height=400&width=300" },
        { view: "Espalda", url: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      date: "2024-12-01",
      photos: [
        { view: "Frente", url: "/placeholder.svg?height=400&width=300" },
        { view: "Perfil", url: "/placeholder.svg?height=400&width=300" },
        { view: "Espalda", url: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      date: "2025-01-01",
      photos: [
        { view: "Frente", url: "/placeholder.svg?height=400&width=300" },
        { view: "Perfil", url: "/placeholder.svg?height=400&width=300" },
        { view: "Espalda", url: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      date: "2025-02-01",
      photos: [
        { view: "Frente", url: "/placeholder.svg?height=400&width=300" },
        { view: "Perfil", url: "/placeholder.svg?height=400&width=300" },
        { view: "Espalda", url: "/placeholder.svg?height=400&width=300" },
      ],
    },
    {
      date: "2025-03-01",
      photos: [
        { view: "Frente", url: "/placeholder.svg?height=400&width=300" },
        { view: "Perfil", url: "/placeholder.svg?height=400&width=300" },
        { view: "Espalda", url: "/placeholder.svg?height=400&width=300" },
      ],
    },
  ]

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photoSets.length - 1 : prev - 1))
  }

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === photoSets.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mis Fotos de Progreso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <Button variant="outline" size="icon" onClick={handlePrevPhoto}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">{photoSets[currentPhotoIndex].date}</span>
                <Button variant="outline" size="icon" onClick={handleNextPhoto}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Tabs defaultValue="front">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="front">Frente</TabsTrigger>
                  <TabsTrigger value="side">Perfil</TabsTrigger>
                  <TabsTrigger value="back">Espalda</TabsTrigger>
                </TabsList>
                <TabsContent value="front">
                  <div className="flex justify-center">
                    <img
                      src={photoSets[currentPhotoIndex].photos[0].url || "/placeholder.svg"}
                      alt="Foto frontal"
                      className="rounded-md max-h-[500px]"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="side">
                  <div className="flex justify-center">
                    <img
                      src={photoSets[currentPhotoIndex].photos[1].url || "/placeholder.svg"}
                      alt="Foto de perfil"
                      className="rounded-md max-h-[500px]"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="back">
                  <div className="flex justify-center">
                    <img
                      src={photoSets[currentPhotoIndex].photos[2].url || "/placeholder.svg"}
                      alt="Foto de espalda"
                      className="rounded-md max-h-[500px]"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-6 flex gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Subir Nuevas Fotos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Fotos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {photoSets.map((set, index) => (
              <div
                key={set.date}
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${index === currentPhotoIndex ? "border-primary" : "border-transparent"}`}
                onClick={() => setCurrentPhotoIndex(index)}
              >
                <img
                  src={set.photos[0].url || "/placeholder.svg"}
                  alt={`Fotos del ${set.date}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-1 text-center text-xs">{set.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

