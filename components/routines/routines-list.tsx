"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoutineCard } from "@/components/routines/routine-card";

const dummyRoutines = [
  {
    id: 1,
    name: "Pérdida de peso",
    type: "Cardio",
    difficulty: "Intermedio",
    duration: "45 min",
  },
  {
    id: 2,
    name: "Tonificación",
    type: "Fuerza",
    difficulty: "Avanzado",
    duration: "60 min",
  },
  {
    id: 3,
    name: "Flexibilidad",
    type: "Yoga",
    difficulty: "Principiante",
    duration: "30 min",
  },
  // ... más rutinas
];

export function RoutinesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredRoutines = dummyRoutines.filter(
    (routine) =>
      routine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "all" || routine.type.toLowerCase() === filter)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Rutinas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex space-x-2'>
            <div className='flex-grow'>
              <Label htmlFor='search-routines' className='sr-only'>
                Buscar rutinas
              </Label>
              <Input
                id='search-routines'
                placeholder='Buscar rutinas...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant='outline'>Filtrar</Button>
            <Button variant='outline'>Ordenar</Button>
          </div>
          <Tabs defaultValue='all' onValueChange={setFilter}>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='all'>Todas</TabsTrigger>
              <TabsTrigger value='cardio'>Cardio</TabsTrigger>
              <TabsTrigger value='fuerza'>Fuerza</TabsTrigger>
              <TabsTrigger value='yoga'>Yoga</TabsTrigger>
            </TabsList>
            <TabsContent value='all'>
              <ScrollArea className='h-[400px] pr-4'>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {filteredRoutines.map((routine) => (
                    <RoutineCard key={routine.id} routine={routine} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
