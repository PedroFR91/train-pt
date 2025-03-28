import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const clientForms = [
  { id: 1, name: "Formulario Inicial", status: "Completado", date: "2023-05-01" },
  { id: 2, name: "Seguimiento Mensual - Junio", status: "Pendiente", date: "2023-06-15" },
]

export default function MyFormsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Mis Formularios</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clientForms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <CardTitle>{form.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={form.status === "Completado" ? "default" : "secondary"}>{form.status}</Badge>
              <p className="mt-2 text-sm text-muted-foreground">Fecha: {form.date}</p>
              <Button className="mt-4 w-full">
                {form.status === "Completado" ? "Ver Respuestas" : "Completar Formulario"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

