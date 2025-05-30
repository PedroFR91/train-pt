"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Star,
  Users,
  Clock,
  Trophy,
  Award,
  CheckCircle,
  CheckCircle2,
  Calendar,
  ArrowRight,
  MessageCircle,
  Utensils,
  Dumbbell,
  BarChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TrainerPublicProfileProps {
  trainerId?: string;
}

interface Trainer {
  firstName: string;
  lastName: string;
  bio?: string;
  picture?: string;
  specialization?: string;
  experience?: string;
  certifications?: string[];
  achievements?: string[];
  rating?: number;
  reviewCount?: number;
  clientCount?: number;
  yearsExperience?: number;
  certificationCount?: number;
  awards?: number;
}

interface Diet {
  id: number;
  title: string;
  description: string;
  image?: string;
  calories: number;
  meals: number;
  duration: string;
  tags: string[];
}

interface Routine {
  id: number;
  title: string;
  description: string;
  image?: string;
  difficulty: string;
  duration: string;
  frequency: string;
  focus: string[];
  tags: string[];
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  author: string;
  authorAvatar?: string;
  category: string;
  comments: number;
  tags: string[];
}

interface Rate {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  duration: string;
  sessionType: string;
  order: number;
  trainerId: number;
}

interface ClientImage {
  id: number;
  imageUrl: string;
}

// Etiquetas por precio
const getLabel = (price: number) => {
  if (price === 0)
    return { text: "FREE", color: "border-red-500 text-red-500" };
  if (price === 59)
    return { text: "MÁS VENDIDO", color: "border-yellow-500 text-yellow-500" };
  if (price > 59)
    return { text: "PRO", color: "border-blue-500 text-blue-500" };
  return { text: "DESTACADO", color: "border-green-500 text-green-500" };
};

export function TrainerPublicProfile({ trainerId }: TrainerPublicProfileProps) {
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rates, setRates] = useState<Rate[]>([]);
  const [clientImages, setClientImages] = useState<ClientImage[]>([]);

  useEffect(() => {
    if (!trainerId) return;

    const fetchTrainerData = async () => {
      try {
        setLoading(true);

        // Fetch trainer profile
        const trainerResponse = await axios.get(`/users/${trainerId}`);
        setTrainer(trainerResponse.data);

        // Fetch trainer's diets
        try {
          const dietsResponse = await axios.get(
            `/diets?trainerId=${trainerId}`
          );
          setDiets(dietsResponse.data);
        } catch (err) {
          console.warn("No se pudieron cargar las dietas:", err);
          setDiets([]);
        }

        // Fetch trainer's routines
        try {
          const routinesResponse = await axios.get(
            `/routines?trainerId=${trainerId}`
          );
          setRoutines(routinesResponse.data);
        } catch (err) {
          console.warn("No se pudieron cargar las rutinas:", err);
          setRoutines([]);
        }

        // Fetch trainer's blog posts
        try {
          const blogResponse = await axios.get(`/blog?trainerId=${trainerId}`);
          setBlogPosts(blogResponse.data);
        } catch (err) {
          console.warn("No se pudieron cargar los posts del blog:", err);
          setBlogPosts([]);
        }

        // Fetch trainer's rates
        try {
          const ratesResponse = await axios.get(
            `/rates?trainerId=${trainerId}`
          );
          setRates(
            ratesResponse.data.sort((a: Rate, b: Rate) => a.order - b.order)
          );
        } catch (err) {
          console.warn("No se pudieron cargar las tarifas:", err);
          setRates([]);
        }

        // Fetch trainer's client images
        try {
          const imagesResponse = await axios.get(
            `/client-images?trainerId=${trainerId}`
          );
          setClientImages(imagesResponse.data);
        } catch (err) {
          console.warn("No se pudieron cargar las imágenes:", err);
          setClientImages([]);
        }
      } catch (err) {
        console.error("Error fetching trainer profile:", err);
        setError("No se pudo cargar el perfil del entrenador");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerData();
  }, [trainerId]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground'>
          {error || "No se encontró el perfil del entrenador"}
        </p>
      </div>
    );
  }

  // Calculate stats from real data or use defaults
  const stats = [
    {
      label: "Clientes",
      value: trainer.clientCount ? `${trainer.clientCount}+` : "200+",
      icon: Users,
    },
    {
      label: "Experiencia",
      value: trainer.yearsExperience
        ? `${trainer.yearsExperience} años`
        : "10 años",
      icon: Clock,
    },
    {
      label: "Certificaciones",
      value:
        trainer.certificationCount?.toString() ||
        trainer.certifications?.length?.toString() ||
        "5",
      icon: Award,
    },
    {
      label: "Premios",
      value: trainer.awards?.toString() || "3",
      icon: Trophy,
    },
  ];

  // Extract specialties from specialization field
  const specialties = trainer.specialization
    ? trainer.specialization.split(",").map((s) => s.trim())
    : ["Entrenamiento personalizado"];

  return (
    <div className='space-y-12'>
      {/* Perfil del entrenador */}
      <Card className='overflow-hidden'>
        <div className='md:flex'>
          <div className='md:w-1/3'>
            <img
              src={trainer.picture || "/placeholder.svg?height=300&width=300"}
              alt={`${trainer.firstName} ${trainer.lastName}`}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='md:w-2/3 p-6'>
            <CardHeader>
              <CardTitle className='text-3xl font-bold'>
                {trainer.firstName} {trainer.lastName}
              </CardTitle>
              <div className='flex items-center mt-2'>
                <Star className='text-yellow-400 w-5 h-5' />
                <span className='ml-1 font-semibold'>
                  {trainer.rating || 4.8}
                </span>
                <span className='ml-1 text-muted-foreground'>
                  ({trainer.reviewCount || 124} reseñas)
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className='mb-4'>
                {trainer.bio ||
                  "Entrenador personal certificado con experiencia en ayudar a clientes a alcanzar sus objetivos de fitness."}
              </p>

              {trainer.experience && (
                <p className='mb-2'>
                  <strong>Experiencia:</strong> {trainer.experience}
                </p>
              )}

              {trainer.certifications && trainer.certifications.length > 0 && (
                <div className='mb-4'>
                  <strong>Certificaciones:</strong>
                  <ul className='list-disc list-inside'>
                    {trainer.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}

              {trainer.achievements && trainer.achievements.length > 0 && (
                <div className='mb-4'>
                  <strong>Logros:</strong>
                  <ul className='mt-2 space-y-2'>
                    {trainer.achievements.map((achievement, index) => (
                      <li key={index} className='flex items-start'>
                        <CheckCircle className='h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5' />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className='flex flex-wrap gap-2'>
                {specialties.map((specialty) => (
                  <Badge key={specialty} variant='secondary'>
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className='mt-6'>
                <Button className='w-full md:w-auto'>Contactar</Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Estadísticas del entrenador */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className='flex flex-col items-center justify-center p-6'>
              <stat.icon className='h-8 w-8 text-primary mb-2' />
              <p className='text-2xl font-bold'>{stat.value}</p>
              <p className='text-sm text-muted-foreground'>{stat.label}</p>
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
          {clientImages.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {clientImages.map((image) => (
                <img
                  key={image.id}
                  src={image.imageUrl || "/placeholder.svg"}
                  alt={`Transformación ${image.id}`}
                  className='rounded-md w-full h-40 object-cover'
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-8'>
              <p className='text-muted-foreground'>
                No hay imágenes disponibles
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tarifas del entrenador */}
      {rates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tarifas y Servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {rates.map((rate) => {
                const label = getLabel(rate.price);
                const isHighlighted = label.text === "MÁS VENDIDO";

                return (
                  <div
                    key={rate.id}
                    className={`rounded-lg overflow-hidden relative ${
                      isHighlighted
                        ? "bg-[#FF0000]"
                        : "bg-[#111] border border-[#222]"
                    }`}>
                    {label.text !== "DESTACADO" && (
                      <div className='absolute top-0 right-0 bg-white text-[#FF0000] text-xs font-bold px-3 py-1 rounded-bl-lg'>
                        {label.text}
                      </div>
                    )}
                    <div
                      className={`p-6 text-center ${
                        isHighlighted ? "text-white" : "text-white"
                      }`}>
                      <div className='flex justify-center mb-4'>
                        <div
                          className={`${
                            isHighlighted ? "text-white" : "text-[#FF0000]"
                          }`}>
                          <Star className='h-10 w-10' />
                        </div>
                      </div>
                      <h3 className='text-xl font-bold mb-2'>{rate.name}</h3>
                      <div className='text-4xl font-bold mb-2'>
                        {rate.price}€
                        <span className='text-xl'>
                          /
                          {rate.duration === "monthly"
                            ? "mes"
                            : rate.duration === "weekly"
                            ? "sem"
                            : "sesión"}
                        </span>
                      </div>
                      <p
                        className={`mb-6 ${
                          isHighlighted ? "text-white/80" : "text-gray-400"
                        }`}>
                        {rate.description ||
                          "Plan de entrenamiento personalizado"}
                      </p>
                      <div className='space-y-3 text-left mb-6'>
                        <div className='flex items-start gap-3'>
                          <div
                            className={`mt-1 ${
                              isHighlighted ? "text-white" : "text-[#FF0000]"
                            }`}>
                            <CheckCircle2 className='h-5 w-5' />
                          </div>
                          <span
                            className={
                              isHighlighted ? "text-white" : "text-gray-300"
                            }>
                            Modalidad:{" "}
                            {rate.sessionType === "individual"
                              ? "Individual"
                              : rate.sessionType === "group"
                              ? "Grupal"
                              : "Online"}
                          </span>
                        </div>
                        <div className='flex items-start gap-3'>
                          <div
                            className={`mt-1 ${
                              isHighlighted ? "text-white" : "text-[#FF0000]"
                            }`}>
                            <CheckCircle2 className='h-5 w-5' />
                          </div>
                          <span
                            className={
                              isHighlighted ? "text-white" : "text-gray-300"
                            }>
                            Seguimiento personalizado
                          </span>
                        </div>
                        <div className='flex items-start gap-3'>
                          <div
                            className={`mt-1 ${
                              isHighlighted ? "text-white" : "text-[#FF0000]"
                            }`}>
                            <CheckCircle2 className='h-5 w-5' />
                          </div>
                          <span
                            className={
                              isHighlighted ? "text-white" : "text-gray-300"
                            }>
                            Rutinas adaptadas a tus objetivos
                          </span>
                        </div>
                      </div>
                      <Button
                        className={`w-full ${
                          isHighlighted
                            ? "bg-white text-[#FF0000] hover:bg-gray-100"
                            : "bg-[#FF0000] text-white hover:bg-[#FF0000]/90"
                        }`}>
                        Contratar Servicio{" "}
                        <ArrowRight className='ml-2 h-5 w-5' />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs para navegar entre las diferentes secciones */}
      <Tabs defaultValue='rates' className='w-full'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='rates'>Tarifas</TabsTrigger>
          <TabsTrigger value='diets'>Planes Nutricionales</TabsTrigger>
          <TabsTrigger value='routines'>Rutinas</TabsTrigger>
          <TabsTrigger value='blog'>Blog</TabsTrigger>
        </TabsList>

        {/* Contenido de Tarifas */}
        <TabsContent value='rates' className='mt-6'>
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold'>Tarifas y Servicios</h2>
            </div>

            {rates.length > 0 ? (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {rates.map((rate) => {
                  const label = getLabel(rate.price);
                  const isHighlighted = label.text === "MÁS VENDIDO";

                  return (
                    <div
                      key={rate.id}
                      className={`rounded-lg overflow-hidden relative ${
                        isHighlighted
                          ? "bg-[#FF0000]"
                          : "bg-[#111] border border-[#222]"
                      }`}>
                      {label.text !== "DESTACADO" && (
                        <div className='absolute top-0 right-0 bg-white text-[#FF0000] text-xs font-bold px-3 py-1 rounded-bl-lg'>
                          {label.text}
                        </div>
                      )}
                      <div
                        className={`p-6 text-center ${
                          isHighlighted ? "text-white" : "text-white"
                        }`}>
                        <div className='flex justify-center mb-4'>
                          <div
                            className={`${
                              isHighlighted ? "text-white" : "text-[#FF0000]"
                            }`}>
                            <Star className='h-10 w-10' />
                          </div>
                        </div>
                        <h3 className='text-xl font-bold mb-2'>{rate.name}</h3>
                        <div className='text-4xl font-bold mb-2'>
                          {rate.price}€
                          <span className='text-xl'>
                            /
                            {rate.duration === "monthly"
                              ? "mes"
                              : rate.duration === "weekly"
                              ? "sem"
                              : "sesión"}
                          </span>
                        </div>
                        <p
                          className={`mb-6 ${
                            isHighlighted ? "text-white/80" : "text-gray-400"
                          }`}>
                          {rate.description ||
                            "Plan de entrenamiento personalizado"}
                        </p>
                        <div className='space-y-3 text-left mb-6'>
                          <div className='flex items-start gap-3'>
                            <div
                              className={`mt-1 ${
                                isHighlighted ? "text-white" : "text-[#FF0000]"
                              }`}>
                              <CheckCircle2 className='h-5 w-5' />
                            </div>
                            <span
                              className={
                                isHighlighted ? "text-white" : "text-gray-300"
                              }>
                              Modalidad:{" "}
                              {rate.sessionType === "individual"
                                ? "Individual"
                                : rate.sessionType === "group"
                                ? "Grupal"
                                : "Online"}
                            </span>
                          </div>
                          <div className='flex items-start gap-3'>
                            <div
                              className={`mt-1 ${
                                isHighlighted ? "text-white" : "text-[#FF0000]"
                              }`}>
                              <CheckCircle2 className='h-5 w-5' />
                            </div>
                            <span
                              className={
                                isHighlighted ? "text-white" : "text-gray-300"
                              }>
                              Seguimiento personalizado
                            </span>
                          </div>
                          <div className='flex items-start gap-3'>
                            <div
                              className={`mt-1 ${
                                isHighlighted ? "text-white" : "text-[#FF0000]"
                              }`}>
                              <CheckCircle2 className='h-5 w-5' />
                            </div>
                            <span
                              className={
                                isHighlighted ? "text-white" : "text-gray-300"
                              }>
                              Rutinas adaptadas a tus objetivos
                            </span>
                          </div>
                        </div>
                        <Button
                          className={`w-full ${
                            isHighlighted
                              ? "bg-white text-[#FF0000] hover:bg-gray-100"
                              : "bg-[#FF0000] text-white hover:bg-[#FF0000]/90"
                          }`}>
                          Contratar Servicio{" "}
                          <ArrowRight className='ml-2 h-5 w-5' />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>
                  No hay tarifas disponibles
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Contenido de Dietas */}
        <TabsContent value='diets' className='mt-6'>
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold'>Planes Nutricionales</h2>
              <Button variant='outline'>Ver todos los planes</Button>
            </div>

            {diets.length > 0 ? (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {diets.map((diet) => (
                  <Card key={diet.id} className='overflow-hidden flex flex-col'>
                    <div className='relative h-48 overflow-hidden'>
                      <img
                        src={
                          diet.image ||
                          "/placeholder.svg?height=200&width=300&text=Plan+Nutricional"
                        }
                        alt={diet.title}
                        className='w-full h-full object-cover transition-transform hover:scale-105'
                      />
                      <div className='absolute top-2 right-2'>
                        <Badge className='bg-primary text-primary-foreground'>
                          <Utensils className='mr-1 h-3 w-3' />
                          {diet.calories} kcal
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{diet.title}</CardTitle>
                      <CardDescription>{diet.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex-grow'>
                      <div className='grid grid-cols-2 gap-2 mb-4'>
                        <div className='text-sm'>
                          <span className='text-muted-foreground'>
                            Comidas:
                          </span>{" "}
                          {diet.meals}/día
                        </div>
                        <div className='text-sm'>
                          <span className='text-muted-foreground'>
                            Duración:
                          </span>{" "}
                          {diet.duration}
                        </div>
                      </div>
                      <div className='flex flex-wrap gap-1'>
                        {diet.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='text-xs'>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant='ghost' className='w-full'>
                        Ver detalles
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>
                  No hay planes nutricionales disponibles
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Contenido de Rutinas */}
        <TabsContent value='routines' className='mt-6'>
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold'>Rutinas de Entrenamiento</h2>
              <Button variant='outline'>Ver todas las rutinas</Button>
            </div>

            {routines.length > 0 ? (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {routines.map((routine) => (
                  <Card
                    key={routine.id}
                    className='overflow-hidden flex flex-col'>
                    <div className='relative h-48 overflow-hidden'>
                      <img
                        src={
                          routine.image ||
                          "/placeholder.svg?height=200&width=300&text=Rutina+Entrenamiento"
                        }
                        alt={routine.title}
                        className='w-full h-full object-cover transition-transform hover:scale-105'
                      />
                      <div className='absolute top-2 right-2'>
                        <Badge className='bg-primary text-primary-foreground'>
                          <Dumbbell className='mr-1 h-3 w-3' />
                          {routine.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{routine.title}</CardTitle>
                      <CardDescription>{routine.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex-grow'>
                      <div className='grid grid-cols-2 gap-2 mb-4'>
                        <div className='text-sm flex items-center'>
                          <Clock className='mr-1 h-4 w-4 text-muted-foreground' />
                          <span>{routine.duration}</span>
                        </div>
                        <div className='text-sm flex items-center'>
                          <BarChart className='mr-1 h-4 w-4 text-muted-foreground' />
                          <span>{routine.frequency}</span>
                        </div>
                      </div>
                      <div className='mb-3'>
                        <span className='text-sm text-muted-foreground'>
                          Enfoque:
                        </span>
                        <div className='flex flex-wrap gap-1 mt-1'>
                          {routine.focus.map((area, index) => (
                            <Badge
                              key={index}
                              variant='secondary'
                              className='text-xs'>
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className='flex flex-wrap gap-1'>
                        {routine.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='text-xs'>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant='ghost' className='w-full'>
                        Ver detalles
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>
                  No hay rutinas disponibles
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Contenido de Blog */}
        <TabsContent value='blog' className='mt-6'>
          <div className='space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold'>Blog Personal</h2>
              <Button variant='outline'>Ver todos los artículos</Button>
            </div>

            {blogPosts.length > 0 ? (
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {blogPosts.map((post) => (
                  <Card key={post.id} className='overflow-hidden flex flex-col'>
                    <div className='relative h-48 overflow-hidden'>
                      <img
                        src={
                          post.image ||
                          "/placeholder.svg?height=200&width=300&text=Blog+Post"
                        }
                        alt={post.title}
                        className='w-full h-full object-cover transition-transform hover:scale-105'
                      />
                      <div className='absolute top-2 right-2'>
                        <Badge className='bg-primary text-primary-foreground'>
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className='flex items-center gap-2 mb-2'>
                        <Avatar className='h-6 w-6'>
                          <AvatarImage
                            src={post.authorAvatar || trainer.picture}
                            alt={post.author}
                          />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className='text-sm text-muted-foreground'>
                          {post.author}
                        </span>
                        <span className='text-sm text-muted-foreground flex items-center'>
                          <Calendar className='mr-1 h-3 w-3' />
                          {post.date}
                        </span>
                      </div>
                      <CardTitle className='line-clamp-2'>
                        {post.title}
                      </CardTitle>
                      <CardDescription className='line-clamp-3'>
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='flex-grow'>
                      <div className='flex flex-wrap gap-1'>
                        {post.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='text-xs'>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <MessageCircle className='mr-1 h-4 w-4' />
                        {post.comments} comentarios
                      </div>
                      <Button variant='ghost' size='sm'>
                        Leer más
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>
                  No hay artículos de blog disponibles
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
