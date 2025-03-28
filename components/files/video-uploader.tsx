"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Video, Upload, Play } from "lucide-react"

export function VideoUploader() {
  const [videos, setVideos] = useState([
    { id: 1, name: "Rutina de calentamiento", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { id: 2, name: "Ejercicios de estiramiento", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    // ... más videos
  ])

  const handleAddVideo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const url = formData.get("url") as string
    if (name && url) {
      setVideos([...videos, { id: Date.now(), name, url }])
      event.currentTarget.reset()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Vídeos</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddVideo} className="space-y-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="video-name">Nombre del vídeo</Label>
              <Input id="video-name" name="name" required />
            </div>
            <div>
              <Label htmlFor="video-url">URL de YouTube</Label>
              <Input id="video-url" name="url" type="url" required />
            </div>
          </div>
          <Button type="submit">
            <Upload className="mr-2 h-4 w-4" />
            Añadir Vídeo
          </Button>
        </form>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Video className="mr-2 h-4 w-4" />
                <span>{video.name}</span>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 h-4 w-4" />
                  Reproducir
                </a>
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

