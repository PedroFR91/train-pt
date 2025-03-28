import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

export function ClientReviews() {
  const reviews = [
    {
      id: 1,
      date: "2024-11-05",
      title: "Revisión mensual - Estado físico y progreso",
      status: "Completada",
      notes: "Buen progreso en la pérdida de peso. Se ajustó la dieta para aumentar la ingesta de proteínas.",
    },
    {
      id: 2,
      date: "2024-12-05",
      title: "Revisión bimensual - Seguimiento de medidas",
      status: "Completada",
      notes: "Reducción significativa en medidas de cintura. Se incrementó la intensidad de los entrenamientos.",
    },
    {
      id: 3,
      date: "2025-01-10",
      title: "Control de peso y ajuste de rutina",
      status: "Completada",
      notes: "Se alcanzó el objetivo de peso intermedio. Nueva rutina enfocada en tonificación.",
    },
    {
      id: 4,
      date: "2025-02-10",
      title: "Revisión trimestral - Evaluación completa",
      status: "Completada",
      notes:
        "Excelente progreso en todos los indicadores. Se establecieron nuevos objetivos para los próximos 3 meses.",
    },
    {
      id: 5,
      date: "2025-03-15",
      title: "Revisión mensual - Ajuste de plan nutricional",
      status: "Pendiente",
      notes: "",
    },
    {
      id: 6,
      date: "2025-04-15",
      title: "Revisión final - Evaluación de resultados",
      status: "Programada",
      notes: "",
    },
  ]

  const upcomingReviews = reviews.filter((review) => review.status !== "Completada")
  const pastReviews = reviews.filter((review) => review.status === "Completada")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Próximas Revisiones</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingReviews.length > 0 ? (
            <div className="space-y-4">
              {upcomingReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{review.title}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{review.date}</span>
                        </div>
                      </div>
                      <Badge variant={review.status === "Pendiente" ? "outline" : "default"}>{review.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No hay revisiones programadas próximamente.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Revisiones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{review.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                    <Badge>Completada</Badge>
                  </div>
                  {review.notes && (
                    <div className="mt-2 p-2 bg-muted rounded-md text-sm">
                      <p>{review.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

