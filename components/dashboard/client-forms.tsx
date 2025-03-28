import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Edit } from "lucide-react"

export function ClientForms() {
  const forms = [
    {
      id: 1,
      name: "Formulario de Registro",
      type: "Inicial",
      date: "2024-10-01",
      status: "PENDIENTE",
    },
    {
      id: 2,
      name: "Cuestionario de Salud",
      type: "Salud",
      date: "2024-11-01",
      status: "COMPLETADO",
    },
    {
      id: 3,
      name: "Encuesta de Satisfacción",
      type: "Feedback",
      date: "2024-12-01",
      status: "PENDIENTE",
    },
    {
      id: 4,
      name: "Seguimiento Mensual",
      type: "Seguimiento",
      date: "2025-01-01",
      status: "COMPLETADO",
    },
    {
      id: 5,
      name: "Evaluación de Progreso",
      type: "Seguimiento",
      date: "2025-02-01",
      status: "COMPLETADO",
    },
    {
      id: 6,
      name: "Actualización de Objetivos",
      type: "Objetivos",
      date: "2025-03-01",
      status: "PENDIENTE",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mis Formularios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Tipo de Formulario</th>
                  <th className="p-3 text-left font-medium">Fecha de Envío</th>
                  <th className="p-3 text-left font-medium">Estado</th>
                  <th className="p-3 text-left font-medium">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id} className="border-b">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{form.name}</span>
                      </div>
                    </td>
                    <td className="p-3">{form.date}</td>
                    <td className="p-3">
                      <Badge variant={form.status === "COMPLETADO" ? "default" : "outline"}>{form.status}</Badge>
                    </td>
                    <td className="p-3">
                      {form.status === "COMPLETADO" ? (
                        <Button variant="ghost" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Revisar
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Rellenar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">Mostrando 1-6 de 6 formularios</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

