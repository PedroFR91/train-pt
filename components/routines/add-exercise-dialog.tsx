"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { exerciseService } from "@/services/exercise-service"
import { Search, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function AddExerciseDialog({ open, onOpenChange, onAddExercises }) {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedExercises, setSelectedExercises] = useState([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true)
        const response = await exerciseService.getExercises()
        if (response.success) {
          setExercises(response.data || [])
        } else {
          toast({
            title: "Error",
            description: "No se pudieron cargar los ejercicios",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching exercises:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los ejercicios",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchExercises()
    }
  }, [open])

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase()) ||
      exercise.muscleGroup.toLowerCase().includes(search.toLowerCase()),
  )

  const handleToggleExercise = (exerciseId) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId) ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId],
    )
  }

  const handleAddExercises = async () => {
    if (selectedExercises.length === 0) {
      toast({
        title: "Error",
        description: "Selecciona al menos un ejercicio",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      await onAddExercises(selectedExercises)
      setSelectedExercises([])
    } catch (error) {
      console.error("Error adding exercises:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "Principiante"
      case "medium":
        return "Intermedio"
      case "hard":
        return "Avanzado"
      default:
        return difficulty
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Añadir Ejercicios</DialogTitle>
          <DialogDescription>Selecciona los ejercicios que quieres añadir a la rutina.</DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar ejercicios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredExercises.length > 0 ? (
                filteredExercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent">
                    <Checkbox
                      id={`exercise-${exercise.id}`}
                      checked={selectedExercises.includes(exercise.id)}
                      onCheckedChange={() => handleToggleExercise(exercise.id)}
                    />
                    <label htmlFor={`exercise-${exercise.id}`} className="flex-1 cursor-pointer flex justify-between">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground">{exercise.muscleGroup}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p>{getDifficultyLabel(exercise.difficulty)}</p>
                        <p>{exercise.duration} min</p>
                      </div>
                    </label>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No se encontraron ejercicios</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddExercises} disabled={selectedExercises.length === 0 || submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Añadiendo...
              </>
            ) : (
              `Añadir ${selectedExercises.length} ejercicios`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

