"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormCard } from "@/components/forms/form-card"

const dummyForms = [
  { id: 1, name: "Evaluación Inicial", type: "Inicial", questions: 10, lastUsed: "2023-05-15" },
  { id: 2, name: "Seguimiento Mensual", type: "Seguimiento", questions: 15, lastUsed: "2023-06-01" },
  { id: 3, name: "Evaluación de Progreso", type: "Seguimiento", questions: 12, lastUsed: "2023-06-10" },
  // ... más formularios
]

export function FormsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredForms = dummyForms.filter(
    (form) =>
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "all" || form.type.toLowerCase() === filter.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Formularios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-grow">
              <Label htmlFor="search-forms" className="sr-only">
                Buscar formularios
              </Label>
              <Input
                id="search-forms"
                placeholder="Buscar formularios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filtrar</Button>
            <Button variant="outline">Ordenar</Button>
          </div>
          <Tabs defaultValue="all" onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="inicial">Iniciales</TabsTrigger>
              <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredForms.map((form) => (
                    <FormCard key={form.id} form={form} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

