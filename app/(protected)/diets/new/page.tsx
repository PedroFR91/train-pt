"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { dietService } from "@/services/diet-service"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Plus, Trash2 } from "lucide-react"

// Esquema de validación para el formulario
const mealSchema = z.object({
  meal: z.string().min(1, { message: "El nombre de la comida es obligatorio" }),
  items: z.array(z.string()).min(1, { message: "Debe haber al menos un alimento" }),
})

const dietFormSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
  calories: z.coerce.number().min(1, { message: "Las calorías deben ser un número positivo" }),
  meals: z.array(mealSchema).min(1, { message: "Debe haber al menos una comida" }),
})

type DietFormValues = z.infer<typeof dietFormSchema>

export default function NewDietPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Valores por defecto para el formulario
  const defaultValues: Partial<DietFormValues> = {
    name: "",
    description: "",
    calories: 2000,
    meals: [
      {
        meal: "Desayuno",
        items: [""],
      },
    ],
  }

  const form = useForm<DietFormValues>({
    resolver: zodResolver(dietFormSchema),
    defaultValues,
  })

  const {
    fields: mealFields,
    append: appendMeal,
    remove: removeMeal,
  } = useFieldArray({
    control: form.control,
    name: "meals",
  })

  const onSubmit = async (data: DietFormValues) => {
    try {
      setIsSubmitting(true)
      const response = await dietService.createDiet(data)

      if (response.success && response.data) {
        toast({
          title: "Dieta creada",
          description: "La dieta se ha creado correctamente",
        })
        router.push(`/diets/${response.data.id}`)
      } else {
        throw new Error(response.error || "Error al crear la dieta")
      }
    } catch (error) {
      console.error("Error creating diet:", error)
      toast({
        title: "Error",
        description: "No se pudo crear la dieta. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función para añadir un nuevo alimento a una comida
  const addFoodItem = (mealIndex: number) => {
    const meals = form.getValues("meals")
    const updatedMeals = [...meals]
    updatedMeals[mealIndex].items.push("")
    form.setValue("meals", updatedMeals)
  }

  // Función para eliminar un alimento de una comida
  const removeFoodItem = (mealIndex: number, itemIndex: number) => {
    const meals = form.getValues("meals")
    const updatedMeals = [...meals]
    updatedMeals[mealIndex].items.splice(itemIndex, 1)
    form.setValue("meals", updatedMeals)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Crear Nueva Dieta</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Dieta</CardTitle>
          <CardDescription>Completa la información para crear un nuevo plan nutricional.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Dieta</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Dieta Mediterránea" {...field} />
                    </FormControl>
                    <FormDescription>Un nombre descriptivo para identificar la dieta.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe los detalles de esta dieta..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Explica el propósito y características de la dieta.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calorías Diarias</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormDescription>Total de calorías diarias recomendadas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Comidas</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendMeal({ meal: "", items: [""] })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Añadir Comida
                  </Button>
                </div>

                {mealFields.map((field, mealIndex) => (
                  <Card key={field.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <FormField
                          control={form.control}
                          name={`meals.${mealIndex}.meal`}
                          render={({ field }) => (
                            <FormItem className="flex-1 mr-2">
                              <FormLabel>Nombre de la Comida</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej: Desayuno" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-8"
                          onClick={() => removeMeal(mealIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">Alimentos</h4>
                          <Button type="button" variant="ghost" size="sm" onClick={() => addFoodItem(mealIndex)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Añadir Alimento
                          </Button>
                        </div>

                        {form.getValues(`meals.${mealIndex}.items`).map((_, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <FormField
                              control={form.control}
                              name={`meals.${mealIndex}.items.${itemIndex}`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input placeholder="Ej: Avena con leche" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFoodItem(mealIndex, itemIndex)}
                              disabled={form.getValues(`meals.${mealIndex}.items`).length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <CardFooter className="flex justify-end px-0 pb-0">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando...
                    </>
                  ) : (
                    "Crear Dieta"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

