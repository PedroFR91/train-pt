import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, BarChart2, Users } from "lucide-react"

interface RoutineCardProps {
  routine: {
    id: number
    name: string
    type: string
    difficulty: string
    duration: string
  }
}

export function RoutineCard({ routine }: RoutineCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{routine.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="flex items-center">
            <BarChart2 className="mr-1 h-4 w-4" />
            {routine.type}
          </span>
          <span className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {routine.duration}
          </span>
        </div>
        <div className="mt-2 text-sm">Dificultad: {routine.difficulty}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Users className="mr-2 h-4 w-4" />
          Asignar
        </Button>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </CardFooter>
    </Card>
  )
}

