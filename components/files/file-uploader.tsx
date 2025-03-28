"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { File, Upload, Download } from "lucide-react"

export function FileUploader() {
  const [files, setFiles] = useState([
    { id: 1, name: "Plan de nutrición.pdf", size: "2.5 MB" },
    { id: 2, name: "Registro de progreso.xlsx", size: "1.8 MB" },
    // ... más archivos
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFiles([...files, { id: Date.now(), name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` }])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Archivos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          <Label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <Upload className="w-6 h-6 text-gray-600" />
                <span className="font-medium text-gray-600">Haz clic para subir o arrastra y suelta</span>
              </span>
            </div>
            <Input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
          </Label>
        </div>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <File className="mr-2 h-4 w-4" />
                <span>{file.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{file.size}</span>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

