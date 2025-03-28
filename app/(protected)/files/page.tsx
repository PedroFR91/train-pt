import { FilesDashboard } from "@/components/files/files-dashboard"
import { FilesManager } from "@/components/files/files-manager"

export default function FilesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Archivos</h1>
      <FilesDashboard />
      <FilesManager />
    </div>
  )
}

