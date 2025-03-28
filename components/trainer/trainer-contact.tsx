import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface TrainerContactProps {
  trainerId: string
}

export function TrainerContact({ trainerId }: TrainerContactProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacta con el Entrenador</CardTitle>
        <CardDescription>Envía un mensaje para resolver tus dudas o comenzar tu entrenamiento.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Mensaje</Label>
            <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={4} />
          </div>
          <Button type="submit" className="w-full">
            Enviar Mensaje
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

