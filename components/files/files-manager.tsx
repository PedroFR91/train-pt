"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoUploader } from "@/components/files/video-uploader"
import { FileUploader } from "@/components/files/file-uploader"
import { PhotoUploader } from "@/components/files/photo-uploader"

export function FilesManager() {
  const [activeTab, setActiveTab] = useState("videos")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="videos">Vídeos</TabsTrigger>
        <TabsTrigger value="files">Archivos</TabsTrigger>
        <TabsTrigger value="photos">Fotos</TabsTrigger>
      </TabsList>
      <TabsContent value="videos">
        <VideoUploader />
      </TabsContent>
      <TabsContent value="files">
        <FileUploader />
      </TabsContent>
      <TabsContent value="photos">
        <PhotoUploader />
      </TabsContent>
    </Tabs>
  )
}

