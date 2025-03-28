import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Image, Video } from "lucide-react"

const clientFiles = [
  { id: 1, name: "Plan de nutrición.pdf", type: "document", date: "2023-06-01" },
  { id: 2, name: "Progreso - Mes 1.jpg", type: "image", date: "2023-06-15" },
  { id: 3, name: "Técnica de sentadillas.mp4", type: "video", date: "2023-05-20" },
]

export default function MyFilesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Mis Archivos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientFiles.map((file) => (
          <Card key={file.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {file.type === "document" && <FileText className="mr-2 h-5 w-5" />}
                {file.type === "image" && <Image className="mr-2 h-5 w-5" />}
                {file.type === "video" && <Video className="mr-2 h-5 w-5" />}
                {file.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Subido el: {file.date}</p>
              <Button className="mt-4 w-full">Ver Archivo</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

