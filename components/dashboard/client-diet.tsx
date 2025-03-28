import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function ClientDiet() {
  const dietData = {
    name: "Plan Nutricional - Fase de Definición",
    calories: 2200,
    protein: 180,
    carbs: 220,
    fat: 60,
    meals: [
      {
        name: "Desayuno",
        time: "7:00",
        foods: [
          { name: "Avena", quantity: "60g", calories: 240 },
          { name: "Proteína en polvo", quantity: "30g", calories: 120 },
          { name: "Plátano", quantity: "1 mediano", calories: 105 },
          { name: "Almendras", quantity: "15g", calories: 90 },
        ],
      },
      {
        name: "Media Mañana",
        time: "10:30",
        foods: [
          { name: "Yogur griego", quantity: "200g", calories: 130 },
          { name: "Frutos rojos", quantity: "100g", calories: 50 },
          { name: "Miel", quantity: "10g", calories: 30 },
        ],
      },
      {
        name: "Comida",
        time: "13:30",
        foods: [
          { name: "Pechuga de pollo", quantity: "150g", calories: 250 },
          { name: "Arroz integral", quantity: "70g", calories: 260 },
          { name: "Verduras salteadas", quantity: "200g", calories: 70 },
          { name: "Aceite de oliva", quantity: "10g", calories: 90 },
        ],
      },
      {
        name: "Merienda",
        time: "17:00",
        foods: [
          { name: "Tortitas de arroz", quantity: "2 unidades", calories: 70 },
          { name: "Atún al natural", quantity: "80g", calories: 94 },
          { name: "Tomate", quantity: "1 mediano", calories: 22 },
        ],
      },
      {
        name: "Cena",
        time: "20:30",
        foods: [
          { name: "Salmón", quantity: "130g", calories: 240 },
          { name: "Patata al horno", quantity: "150g", calories: 130 },
          { name: "Ensalada verde", quantity: "100g", calories: 25 },
          { name: "Aceite de oliva", quantity: "5g", calories: 45 },
        ],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mi Dieta</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">{dietData.name}</h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="bg-primary/10 p-4 rounded-lg text-center">
                <p className="text-sm font-medium">Calorías</p>
                <p className="text-2xl font-bold">{dietData.calories}</p>
                <p className="text-xs text-muted-foreground">kcal/día</p>
              </div>
              <div className="bg-blue-500/10 p-4 rounded-lg text-center">
                <p className="text-sm font-medium">Proteínas</p>
                <p className="text-2xl font-bold">{dietData.protein}g</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(((dietData.protein * 4) / dietData.calories) * 100)}% de calorías
                </p>
              </div>
              <div className="bg-amber-500/10 p-4 rounded-lg text-center">
                <p className="text-sm font-medium">Carbohidratos</p>
                <p className="text-2xl font-bold">{dietData.carbs}g</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(((dietData.carbs * 4) / dietData.calories) * 100)}% de calorías
                </p>
              </div>
              <div className="bg-red-500/10 p-4 rounded-lg text-center">
                <p className="text-sm font-medium">Grasas</p>
                <p className="text-2xl font-bold">{dietData.fat}g</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(((dietData.fat * 9) / dietData.calories) * 100)}% de calorías
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              {dietData.meals.map((meal, index) => (
                <TabsTrigger key={index} value={`meal-${index}`}>
                  {meal.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <div className="space-y-6">
                {dietData.meals.map((meal, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{meal.name}</h4>
                      <span className="text-sm text-muted-foreground">{meal.time}</span>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-muted-foreground">
                          <th className="pb-2">Alimento</th>
                          <th className="pb-2">Cantidad</th>
                          <th className="pb-2 text-right">Calorías</th>
                        </tr>
                      </thead>
                      <tbody>
                        {meal.foods.map((food, foodIndex) => (
                          <tr key={foodIndex}>
                            <td className="py-1">{food.name}</td>
                            <td className="py-1">{food.quantity}</td>
                            <td className="py-1 text-right">{food.calories} kcal</td>
                          </tr>
                        ))}
                        <tr className="border-t">
                          <td className="pt-2 font-semibold">Total</td>
                          <td></td>
                          <td className="pt-2 text-right font-semibold">
                            {meal.foods.reduce((sum, food) => sum + food.calories, 0)} kcal
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </TabsContent>
            {dietData.meals.map((meal, index) => (
              <TabsContent key={index} value={`meal-${index}`}>
                <div className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{meal.name}</h4>
                    <span className="text-sm text-muted-foreground">{meal.time}</span>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-muted-foreground">
                        <th className="pb-2">Alimento</th>
                        <th className="pb-2">Cantidad</th>
                        <th className="pb-2 text-right">Calorías</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meal.foods.map((food, foodIndex) => (
                        <tr key={foodIndex}>
                          <td className="py-1">{food.name}</td>
                          <td className="py-1">{food.quantity}</td>
                          <td className="py-1 text-right">{food.calories} kcal</td>
                        </tr>
                      ))}
                      <tr className="border-t">
                        <td className="pt-2 font-semibold">Total</td>
                        <td></td>
                        <td className="pt-2 text-right font-semibold">
                          {meal.foods.reduce((sum, food) => sum + food.calories, 0)} kcal
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

