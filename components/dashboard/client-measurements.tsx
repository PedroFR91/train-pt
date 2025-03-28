"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function ClientMeasurements() {
  const [dateRange, setDateRange] = useState("3m")

  // Datos mockeados para las medidas
  const measurementsData = [
    { date: "2024-10-01", weight: 87, bodyFat: 24, chest: 105, waist: 98, hips: 104 },
    { date: "2024-10-15", weight: 86, bodyFat: 23.5, chest: 104, waist: 97, hips: 103 },
    { date: "2024-11-01", weight: 84.5, bodyFat: 22.8, chest: 103, waist: 95, hips: 102 },
    { date: "2024-11-15", weight: 83, bodyFat: 22, chest: 102, waist: 93, hips: 101 },
    { date: "2024-12-01", weight: 81.5, bodyFat: 21.2, chest: 101, waist: 91, hips: 100 },
    { date: "2024-12-15", weight: 80, bodyFat: 20.5, chest: 100, waist: 89, hips: 99 },
    { date: "2025-01-01", weight: 79, bodyFat: 19.8, chest: 99, waist: 87, hips: 98 },
    { date: "2025-01-15", weight: 78, bodyFat: 19, chest: 98, waist: 86, hips: 97 },
    { date: "2025-02-01", weight: 77, bodyFat: 18.5, chest: 97, waist: 85, hips: 96 },
    { date: "2025-02-15", weight: 76, bodyFat: 18, chest: 96, waist: 84, hips: 95 },
    { date: "2025-03-01", weight: 75, bodyFat: 17.5, chest: 95, waist: 83, hips: 94 },
    { date: "2025-03-15", weight: 74, bodyFat: 17, chest: 94, waist: 82, hips: 93 },
  ]

  // Filtrar datos según el rango de fechas seleccionado
  const getFilteredData = () => {
    const now = new Date("2025-03-15")
    const startDate = new Date("2025-03-15")

    switch (dateRange) {
      case "1m":
        startDate.setMonth(now.getMonth() - 1)
        break
      case "3m":
        startDate.setMonth(now.getMonth() - 3)
        break
      case "6m":
        startDate.setMonth(now.getMonth() - 6)
        break
      case "all":
        return measurementsData
      default:
        startDate.setMonth(now.getMonth() - 3)
    }

    return measurementsData.filter((item) => new Date(item.date) >= startDate)
  }

  const filteredData = getFilteredData()

  // Calcular cambios
  const calculateChange = (metric) => {
    if (filteredData.length < 2) return 0
    const latest = filteredData[filteredData.length - 1][metric]
    const oldest = filteredData[0][metric]
    return latest - oldest
  }

  // Datos para el gráfico de composición corporal
  const bodyCompositionData = [
    { name: "Grasa", value: filteredData[filteredData.length - 1].bodyFat },
    { name: "Músculo", value: 45 },
    { name: "Agua", value: 30 },
    { name: "Otros", value: 100 - filteredData[filteredData.length - 1].bodyFat - 45 - 30 },
  ]

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mis Medidas</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button variant={dateRange === "1m" ? "default" : "ghost"} size="sm" onClick={() => setDateRange("1m")}>
                1M
              </Button>
              <Button variant={dateRange === "3m" ? "default" : "ghost"} size="sm" onClick={() => setDateRange("3m")}>
                3M
              </Button>
              <Button variant={dateRange === "6m" ? "default" : "ghost"} size="sm" onClick={() => setDateRange("6m")}>
                6M
              </Button>
              <Button variant={dateRange === "all" ? "default" : "ghost"} size="sm" onClick={() => setDateRange("all")}>
                Todo
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">Peso Actual</p>
                <p className="text-2xl font-bold">{filteredData[filteredData.length - 1].weight} kg</p>
                <p className={`text-xs ${calculateChange("weight") < 0 ? "text-green-500" : "text-red-500"}`}>
                  {calculateChange("weight").toFixed(1)} kg
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">% Grasa Corporal</p>
                <p className="text-2xl font-bold">{filteredData[filteredData.length - 1].bodyFat}%</p>
                <p className={`text-xs ${calculateChange("bodyFat") < 0 ? "text-green-500" : "text-red-500"}`}>
                  {calculateChange("bodyFat").toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">Cintura</p>
                <p className="text-2xl font-bold">{filteredData[filteredData.length - 1].waist} cm</p>
                <p className={`text-xs ${calculateChange("waist") < 0 ? "text-green-500" : "text-red-500"}`}>
                  {calculateChange("waist").toFixed(1)} cm
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm font-medium">IMC</p>
                <p className="text-2xl font-bold">
                  {(filteredData[filteredData.length - 1].weight / Math.pow(1.78, 2)).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">Normal</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="weight">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="weight">Peso</TabsTrigger>
              <TabsTrigger value="measurements">Medidas</TabsTrigger>
              <TabsTrigger value="body-fat">Grasa Corporal</TabsTrigger>
              <TabsTrigger value="composition">Composición</TabsTrigger>
            </TabsList>

            <TabsContent value="weight">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={filteredData}>
                        <defs>
                          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="weight"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorWeight)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="measurements">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="chest" stroke="#8884d8" name="Pecho" />
                        <Line type="monotone" dataKey="waist" stroke="#82ca9d" name="Cintura" />
                        <Line type="monotone" dataKey="hips" stroke="#ffc658" name="Cadera" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="body-fat">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="bodyFat" name="% Grasa Corporal" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="composition">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-[400px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bodyCompositionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {bodyCompositionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

