import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Award,
  CheckCircle,
  Users,
  Clock,
  Trophy,
  Calendar,
  ArrowRight,
  MessageCircle,
  Utensils,
  Dumbbell,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TrainerPublicProfileProps {
  trainerId?: string
}

export function TrainerPublicProfile({ trainerId }: TrainerPublicProfileProps) {
  // En una implementación real, aquí cargaríamos los datos del entrenador usando el trainerId
  const trainer = {
    name: "Juan Pérez",
    specialties: ["Pérdida de peso", "Musculación", "Entrenamiento funcional"],
    rating: 4.8,
    reviews: 124,
    bio: "Entrenador personal certificado con más de 10 años de experiencia. Especializado en ayudar a mis clientes a alcanzar sus objetivos de fitness de manera efectiva y sostenible.",
    image: "/placeholder.svg?height=300&width=300",
    experience: "10 años de experiencia en entrenamiento personal",
    certifications: ["Certificado en Nutrición Deportiva", "Especialista en Entrenamiento Funcional"],
    achievements: [
      "Más de 200 clientes satisfechos",
      "Transformaciones con pérdida de +20kg",
      "Preparador de atletas de competición",
    ],
    stats: [
      { label: "Clientes", value: "200+", icon: Users },
      { label: "Experiencia", value: "10 años", icon: Clock },
      { label: "Certificaciones", value: "5", icon: Award },
      { label: "Premios", value: "3", icon: Trophy },
    ],
  }

  // Datos de ejemplo para las dietas
  const diets = [
    {
      id: 1,
      title: "Dieta para pérdida de peso",
      description: "Plan nutricional equilibrado para perder peso de forma saludable y sostenible.",
      image: "/placeholder.svg?height=200&width=300&text=Dieta+Pérdida+de+Peso",
      calories: 1800,
      meals: 5,
      duration: "12 semanas",
      tags: ["Bajo en carbohidratos", "Alto en proteínas", "Sin gluten"],
    },
    {
      id: 2,
      title: "Dieta para ganancia muscular",
      description: "Plan nutricional enfocado en el aumento de masa muscular con superávit calórico controlado.",
      image: "/placeholder.svg?height=200&width=300&text=Dieta+Ganancia+Muscular",
      calories: 2800,
      meals: 6,
      duration: "16 semanas",
      tags: ["Alto en proteínas", "Carbohidratos complejos", "Post-entrenamiento"],
    },
    {
      id: 3,
      title: "Dieta vegetariana deportiva",
      description: "Plan nutricional vegetariano diseñado para deportistas que buscan mejorar su rendimiento.",
      image: "/placeholder.svg?height=200&width=300&text=Dieta+Vegetariana",
      calories: 2200,
      meals: 5,
      duration: "Continua",
      tags: ["Vegetariano", "Rico en hierro", "Proteína vegetal"],
    },
  ]

  // Datos de ejemplo para las rutinas
  const routines = [
    {
      id: 1,
      title: "Rutina de Hipertrofia",
      description: "Programa de entrenamiento enfocado en el aumento de masa muscular con ejercicios compuestos.",
      image: "/placeholder.svg?height=200&width=300&text=Rutina+Hipertrofia",
      difficulty: "Intermedio",
      duration: "60 min",
      frequency: "4 días/semana",
      focus: ["Pecho", "Espalda", "Piernas", "Hombros"],
      tags: ["Hipertrofia", "Volumen", "Fuerza"],
    },
    {
      id: 2,
      title: "Rutina de Definición",
      description: "Programa de alta intensidad para quemar grasa y definir la musculatura con circuitos.",
      image: "/placeholder.svg?height=200&width=300&text=Rutina+Definición",
      difficulty: "Avanzado",
      duration: "45 min",
      frequency: "5 días/semana",
      focus: ["Full Body", "HIIT", "Cardio"],
      tags: ["Definición", "Quema grasa", "Alta intensidad"],
    },
    {
      id: 3,
      title: "Rutina para Principiantes",
      description: "Programa introductorio para personas que comienzan en el mundo del fitness.",
      image: "/placeholder.svg?height=200&width=300&text=Rutina+Principiantes",
      difficulty: "Principiante",
      duration: "40 min",
      frequency: "3 días/semana",
      focus: ["Técnica", "Adaptación", "Full Body"],
      tags: ["Principiantes", "Técnica", "Progresión"],
    },
  ]

  // Datos de ejemplo para el blog
  const blogPosts = [
    {
      id: 1,
      title: "Cómo optimizar tu recuperación muscular",
      excerpt:
        "Descubre las mejores estrategias para maximizar la recuperación muscular y mejorar tus resultados en el gimnasio.",
      image: "/placeholder.svg?height=200&width=300&text=Recuperación+Muscular",
      date: "15 de marzo, 2025",
      author: "Juan Pérez",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Recuperación",
      comments: 8,
      tags: ["Recuperación", "Descanso", "Nutrición"],
    },
    {
      id: 2,
      title: "Guía completa de suplementación deportiva",
      excerpt:
        "Análisis detallado de los suplementos más efectivos para mejorar tu rendimiento deportivo y cuándo utilizarlos.",
      image: "/placeholder.svg?height=200&width=300&text=Suplementación",
      date: "2 de marzo, 2025",
      author: "Juan Pérez",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Nutrición",
      comments: 12,
      tags: ["Suplementos", "Proteínas", "Creatina"],
    },
    {
      id: 3,
      title: "Los 5 errores más comunes en el entrenamiento de fuerza",
      excerpt:
        "Identifica y corrige los errores que podrían estar limitando tu progreso en el entrenamiento con pesas.",
      image: "/placeholder.svg?height=200&width=300&text=Errores+Entrenamiento",
      date: "20 de febrero, 2025",
      author: "Juan Pérez",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "Entrenamiento",
      comments: 15,
      tags: ["Técnica", "Fuerza", "Progresión"],
    },
  ]

  return (
    <div className="space-y-12">
      {/* Perfil del entrenador */}
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img src={trainer.image || "/placeholder.svg"} alt={trainer.name} className="w-full h-full object-cover" />
          </div>
          <div className="md:w-2/3 p-6">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{trainer.name}</CardTitle>
              <div className="flex items-center mt-2">
                <Star className="text-yellow-400 w-5 h-5" />
                <span className="ml-1 font-semibold">{trainer.rating}</span>
                <span className="ml-1 text-muted-foreground">({trainer.reviews} reseñas)</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{trainer.bio}</p>
              <p className="mb-2">
                <strong>Experiencia:</strong> {trainer.experience}
              </p>
              <div className="mb-4">
                <strong>Certificaciones:</strong>
                <ul className="list-disc list-inside">
                  {trainer.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <strong>Logros:</strong>
                <ul className="mt-2 space-y-2">
                  {trainer.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {trainer.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <div className="mt-6">
                <Button className="w-full md:w-auto">Contactar</Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Estadísticas del entrenador */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trainer.stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <stat.icon className="h-8 w-8 text-primary mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Galería de fotos */}
      <Card>
        <CardHeader>
          <CardTitle>Galería de Fotos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="/placeholder.svg?height=150&width=150&text=Antes/Después"
              alt="Transformación 1"
              className="rounded-md w-full h-40 object-cover"
            />
            <img
              src="/placeholder.svg?height=150&width=150&text=Entrenamiento"
              alt="Entrenamiento"
              className="rounded-md w-full h-40 object-cover"
            />
            <img
              src="/placeholder.svg?height=150&width=150&text=Grupo"
              alt="Clase grupal"
              className="rounded-md w-full h-40 object-cover"
            />
            <img
              src="/placeholder.svg?height=150&width=150&text=Certificación"
              alt="Certificación"
              className="rounded-md w-full h-40 object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs para navegar entre las diferentes secciones */}
      <Tabs defaultValue="diets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diets">Planes Nutricionales</TabsTrigger>
          <TabsTrigger value="routines">Rutinas</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>

        {/* Contenido de Dietas */}
        <TabsContent value="diets" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Planes Nutricionales</h2>
              <Button variant="outline">Ver todos los planes</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {diets.map((diet) => (
                <Card key={diet.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={diet.image || "/placeholder.svg"}
                      alt={diet.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Utensils className="mr-1 h-3 w-3" />
                        {diet.calories} kcal
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{diet.title}</CardTitle>
                    <CardDescription>{diet.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Comidas:</span> {diet.meals}/día
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Duración:</span> {diet.duration}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {diet.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Ver detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Contenido de Rutinas */}
        <TabsContent value="routines" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Rutinas de Entrenamiento</h2>
              <Button variant="outline">Ver todas las rutinas</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {routines.map((routine) => (
                <Card key={routine.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={routine.image || "/placeholder.svg"}
                      alt={routine.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Dumbbell className="mr-1 h-3 w-3" />
                        {routine.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{routine.title}</CardTitle>
                    <CardDescription>{routine.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{routine.duration}</span>
                      </div>
                      <div className="text-sm flex items-center">
                        <BarChart className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{routine.frequency}</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="text-sm text-muted-foreground">Enfoque:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {routine.focus.map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {routine.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Ver detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Contenido de Blog */}
        <TabsContent value="blog" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Blog Personal</h2>
              <Button variant="outline">Ver todos los artículos</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">{post.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{post.author}</span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {post.date}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {post.comments} comentarios
                    </div>
                    <Button variant="ghost" size="sm">
                      Leer más
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

