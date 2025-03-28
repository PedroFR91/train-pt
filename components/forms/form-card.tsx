import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Copy, Send } from "lucide-react"

interface FormCardProps {
  form: {
    id: number
    name: string
    type: string
    questions: number
    lastUsed: string
  }
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          {form.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{form.type}</span>
          <span>{form.questions} preguntas</span>
        </div>
        <div className="mt-2 text-sm flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          Último uso: {form.lastUsed}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Copy className="mr-2 h-4 w-4" />
          Duplicar
        </Button>
        <Button variant="outline" size="sm">
          <Send className="mr-2 h-4 w-4" />
          Enviar
        </Button>
      </CardFooter>
    </Card>
  )
}

