"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  ArrowRight,
  Star,
  Crown,
  Diamond,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function LandingPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const features = [
    {
      id: "routines",
      title: "RUTINAS",
      subtitle: "Creador de Rutinas",
      description:
        "Diseña entrenamientos personalizados de forma rápida y visual. Arrastra y suelta ejercicios, ajusta repeticiones y guarda plantillas para cada tipo de cliente.",
      bulletPoints: [
        "Biblioteca con más de 500 ejercicios listos para usar",
        "Personaliza series, repeticiones y descansos",
        "Asigna rutinas específicas por objetivo o nivel",
        "Guarda plantillas reutilizables para ahorrar tiempo",
      ],
      image:
        "https://images.pexels.com/photos/6456303/pexels-photo-6456303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "forms",
      title: "FORMULARIOS",
      subtitle: "Formularios automatizados y personalizados",
      description:
        "Olvídate de perseguir a tus clientes. Crea check-ins automáticos, formularios de onboarding o seguimiento semanal y ten su feedback sin pedirlo dos veces.",
      bulletPoints: [
        "Recoge datos clave sin enviar mil mensajes",
        "Personaliza cada formulario según el tipo de cliente",
        "Automatiza check-ins semanales y evaluación de progreso",
        "Guarda todas las respuestas dentro del perfil del cliente",
      ],
      image:
        "https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "tracking",
      title: "PROGRESO EN GRÁFICO",
      subtitle: "Seguimiento del Progreso",
      description:
        "Haz que tus clientes vean lo que antes solo sentían. Peso, medidas, evolución gráfica y fotos de seguimiento: todo desde un mismo lugar.",
      bulletPoints: [
        "Gráficas automáticas de evolución: peso, medidas, fotos",
        "Comparativa visual entre fechas para mostrar avances",
        "Seguimiento por fases o bloques de entrenamiento",
        "Refuerza la adherencia mostrando resultados reales",
      ],
      image:
        "https://images.pexels.com/photos/5717062/pexels-photo-5717062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "payments",
      title: "COBROS",
      subtitle: "Cobros Online y Facturación",
      description:
        "Cobra como un pro y sin perseguir pagos. Gestiona tus planes, cuotas, sesiones y automatiza facturas sin complicarte.",
      bulletPoints: [
        "Recibe pagos únicos o recurrentes por Stripe",
        "Crea diferentes planes de precios para tus clientes",
        "Automatiza facturación sin salir de la plataforma",
        "Olvídate de recordatorios: los cobros se hacen solos",
      ],
      image:
        "https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "calendar",
      title: "CALENDARIO",
      subtitle: "Agenda y Calendario Integrados",
      description:
        "Planifica sesiones, citas, entrenamientos o check-ins. Sin cruzar mensajes. Todo está sincronizado entre tú y tu cliente.",
      bulletPoints: [
        "Visualiza tu semana y la de tus clientes en segundos",
        "Añade sesiones recurrentes, cambios o descansos",
        "Envía recordatorios automáticos antes de cada cita",
        "Integra entrenos, llamadas o evaluaciones en un mismo calendario",
      ],
      image:
        "https://images.pexels.com/photos/5717041/pexels-photo-5717041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "visibility",
      title: "VISIBILIDAD",
      subtitle: "Tu Perfil Profesional",
      description:
        "Además de usar la plataforma para gestionar, puedes dejar que te encuentren. Estás dentro de un espacio donde clientes pueden buscar entrenadores como tú, por especialidad o estilo, y contratarte directamente.",
      bulletPoints: [
        "Aparece en los resultados de búsqueda dentro de TrainerPT",
        "Comparte tu perfil profesional como carta de presentación en redes, WhatsApp o donde quieras",
        "Recibe contactos directos de clientes que ya buscan lo que tú ofreces",
        "Todo sin moverte: entrenas, gestionas y creces desde un solo lugar",
      ],
      image:
        "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "web",
      title: "100% WEB",
      subtitle: "Plataforma 100% Web",
      description:
        "Nada que descargar. Ni para ti, ni para ellos. Tus clientes acceden desde cualquier navegador, tú trabajas desde donde quieras.",
      bulletPoints: [
        "Accesible desde móvil, tablet o PC",
        "No necesitas apps externas ni configuraciones raras",
        "Tus clientes entran con un clic y lo tienen todo",
        "Siempre actualizado, sin instalaciones",
      ],
      image:
        "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const pricingPlans = [
    {
      icon: <Star className='h-10 w-10' />,
      title: "FREE",
      price: "0€",
      period: "/ mes",
      description: "Para empezar sin excusas",
      features: [
        "Hasta 3 clientes activos",
        "Hasta 3 plantillas de formulario",
        "Soporte básico",
        "Perfil profesional público",
        "Sin tarjeta, sin compromiso",
      ],
      cta: "Empieza gratis",
      highlighted: false,
    },
    {
      icon: <Star className='h-10 w-10' />,
      title: "STARTER",
      price: "39€",
      period: "/ mes",
      description: "Ideal para escalar sin complicaciones",
      features: [
        "Hasta 15 clientes activos",
        "Formularios y rutinas ilimitadas",
        "Soporte básico",
        "Estadísticas de tu negocio",
        "Todo lo incluido en el plan gratuito",
      ],
      cta: "Llega al siguiente nivel",
      highlighted: false,
    },
    {
      icon: <Crown className='h-10 w-10' />,
      title: "PRO",
      price: "59€",
      period: "/ mes",
      description: "Para entrenadores que quieren crecer de verdad",
      features: [
        "Hasta 40 clientes activos",
        "Formularios y rutinas ilimitadas",
        "Soporte prioritario",
        "Acceso anticipado a nuevas funcionalidades",
        "Todo lo incluido en el plan starter",
      ],
      cta: "Listo para escalar",
      highlighted: true,
      badge: "Más vendido",
    },
    {
      icon: <Diamond className='h-10 w-10' />,
      title: "ELITE",
      price: "89€",
      period: "/ mes",
      description: "Para pros con volumen o estudios",
      features: [
        "Clientes ilimitados",
        "Acceso prioritario al soporte 24/7",
        "Acceso anticipado a nuevas funcionalidades",
        "Todo lo incluido en el plan pro",
      ],
      cta: "Crece sin límites",
      highlighted: false,
    },
  ];

  const trainerBenefits = [
    {
      title: "Tu servicio se ve profesional desde el primer día",
      description:
        "Olvídate del caos visual. Tus clientes reciben todo estructurado, claro y con imagen de marca.",
      image:
        "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Tu perfil vende por ti",
      description:
        "Reseñas, resultados reales y tarifas visibles. Solo con entrar, ya confían en ti.",
      image:
        "https://images.pexels.com/photos/8436586/pexels-photo-8436586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Todo centralizado, cero líos",
      description:
        "Rutinas, pagos, seguimiento, mensajes... Todo en un sitio. Y tú, con la cabeza libre.",
      image:
        "https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Tus clientes lo notan (y se quedan)",
      description:
        "La experiencia mejora. Se sienten cuidados. Y eso se traduce en retención real.",
      image:
        "https://images.pexels.com/photos/6456270/pexels-photo-6456270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const clientBenefits = [
    {
      title: "Visualizan su progreso como nunca",
      description:
        "Peso, medidas, evolución. Todo en gráficos que motivan, refuerzan y hacen tangible su esfuerzo.",
      image:
        "https://images.pexels.com/photos/5717062/pexels-photo-5717062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Acceso claro a todo su plan",
      description:
        "Rutinas, dieta, mensajes y tareas: siempre disponibles desde cualquier dispositivo.",
      image:
        "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Feedback constante sin perseguirles",
      description:
        "Check-ins automáticos, respuestas semanales y sensación de acompañamiento real.",
      image:
        "https://images.pexels.com/photos/3912944/pexels-photo-3912944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Una experiencia de entrenador premium",
      description:
        "Tus clientes no saben que usas TrainerPT. Pero notan que todo fluye.",
      image:
        "https://images.pexels.com/photos/6456292/pexels-photo-6456292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const profileBenefits = [
    {
      title: "Foto, bio y tus tarifas claras",
      description:
        "Preséntate como un pro. Di qué haces, cuánto cobras y cómo se trabaja contigo.",
      image:
        "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Resultados que hablan por ti",
      description:
        "Muestra las transformaciones reales de tus clientes. Sin postureo. Solo impacto.",
      image:
        "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Reseñas que generan confianza",
      description:
        "Testimonios que transmiten lo que es entrenar contigo. Nada vende mejor.",
      image:
        "https://images.pexels.com/photos/8436586/pexels-photo-8436586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Te encuentran. Te contratan.",
      description:
        "Tu perfil está en el radar de clientes que buscan entrenadores. Y tú ya estás ahí, a un clic de distancia.",
      image:
        "https://images.pexels.com/photos/6456270/pexels-photo-6456270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) =>
      prev === trainerBenefits.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? trainerBenefits.length - 1 : prev - 1
    );
  };

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Hero Section */}
      <section className='relative h-screen flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 w-full h-full'>
          <img
            src='/images/trainer-with-tablet.png'
            alt='Entrenador personal usando tablet'
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-black/50'></div>
        </div>
        <div className='relative z-10 text-center max-w-4xl px-4'>
          <h1 className='text-6xl md:text-8xl font-bold mb-2 tracking-tighter'>
            ENTRENA COMO SIEMPRE
          </h1>
          <h1 className='text-6xl md:text-8xl font-bold mb-6 tracking-tighter text-[#FF0000]'>
            GESTIONA COMO NUNCA
          </h1>
          <p className='text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto'>
            Crea rutinas, organiza a tus clientes, cobra online y destaca con un
            perfil profesional que te representa. Todo sin caos, sin mil apps y
            sin parecer un aficionado.
          </p>
          <div className='flex justify-center'>
            <Button
              size='lg'
              className='text-lg px-8 py-6 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white w-full max-w-xl'
              asChild>
              <Link href='/register'>
                EMPIEZA GRATIS CON TUS 3 PRIMEROS CLIENTES
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video Preview Section */}
      <section className='py-20 bg-[#0A0A0A]'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold mb-12 tracking-tight'>
            CONOCE <span className='text-[#FF0000]'>TRAINER PT</span>
          </h2>
          <div className='relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border-2 border-[#333]'>
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <div className='bg-[#FF0000] rounded-full p-6 cursor-pointer hover:bg-[#FF0000]/90 transition-all'>
                <Play className='h-12 w-12 text-white' />
              </div>
            </div>
            <img
              src='https://images.pexels.com/photos/4164766/pexels-photo-4164766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='Video preview'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-black'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight'>
            TU NEGOCIO EN ORDEN.{" "}
            <span className='text-[#FF0000]'>SIN CAOS. SIN APPS SUELTAS.</span>
          </h2>
          <p className='text-xl text-center text-gray-400 mb-16 max-w-3xl mx-auto'>
            ¿Tienes Excel, WhatsApp, notas, PDF sueltos y cabeza saturada? Con
            TrainerPT lo tienes todo en una sola plataforma.
          </p>

          <Tabs defaultValue={features[0].id} className='max-w-5xl mx-auto'>
            <TabsList className='w-full grid grid-cols-4 mb-6 bg-[#111]'>
              {features.slice(0, 4).map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className='text-sm md:text-base lg:text-lg py-3 px-2 data-[state=active]:bg-[#FF0000] data-[state=active]:text-white whitespace-nowrap'>
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className='w-full grid grid-cols-3 mb-12 bg-[#111]'>
              {features.slice(4).map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className='text-sm md:text-base lg:text-lg py-3 px-2 data-[state=active]:bg-[#FF0000] data-[state=active]:text-white whitespace-nowrap'>
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {features.map((feature) => (
              <TabsContent
                key={feature.id}
                value={feature.id}
                className='border border-[#222] rounded-lg p-6 bg-[#111]'>
                <div className='grid md:grid-cols-2 gap-8 items-center'>
                  <div>
                    <h3 className='text-3xl font-bold mb-2'>
                      {feature.subtitle}
                    </h3>
                    <p className='text-gray-300 mb-6'>{feature.description}</p>
                    <ul className='space-y-3'>
                      {feature.bulletPoints.map((point, index) => (
                        <FeatureListItem key={index} text={point} />
                      ))}
                    </ul>
                    <Button className='mt-6 bg-[#FF0000] hover:bg-[#FF0000]/90'>
                      Ver ejemplo completo
                    </Button>
                  </div>
                  <div className='rounded-lg overflow-hidden shadow-2xl border border-[#333]'>
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className='w-full h-auto'
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Trainer Benefits Section */}
      <section className='py-20 bg-[#0A0A0A]'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight'>
            LA DIFERENCIA ENTRE SER BUENO...{" "}
            <span className='text-[#FF0000]'>Y PARECERLO.</span>
          </h2>
          <p className='text-xl text-center text-gray-400 mb-16 max-w-3xl mx-auto'>
            Puedes ser un entrenador increíble, pero si tu servicio no lo
            parece, tus clientes no lo sienten. TrainerPT organiza tu trabajo,
            mejora tu presencia y transforma la experiencia que das. No te hace
            mejor entrenador. Hace que los demás lo vean.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {trainerBenefits.map((benefit, index) => (
              <div
                key={index}
                className='bg-[#111] rounded-lg overflow-hidden border border-[#222]'>
                <div className='h-48 overflow-hidden'>
                  <img
                    src={benefit.image || "/placeholder.svg"}
                    alt={benefit.title}
                    className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-3'>{benefit.title}</h3>
                  <p className='text-gray-400'>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Experience Section */}
      <section className='py-20 bg-black'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight'>
            NO CAMBIA LO QUE HACES.{" "}
            <span className='text-[#FF0000]'>CAMBIA CÓMO LO VIVEN.</span>
          </h2>
          <p className='text-xl text-center text-gray-400 mb-16 max-w-3xl mx-auto'>
            TrainerPT no está hecho para que tu cliente lo vea. Está hecho para
            que lo sienta: entrenamientos claros, progreso visible y una
            experiencia que transmite profesionalidad. Todo desde una web
            diseñada para que tú parezcas aún mejor de lo que ya eres.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {clientBenefits.map((benefit, index) => (
              <div
                key={index}
                className='bg-[#111] rounded-lg overflow-hidden border border-[#222]'>
                <div className='h-48 overflow-hidden'>
                  <img
                    src={benefit.image || "/placeholder.svg"}
                    alt={benefit.title}
                    className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-3'>{benefit.title}</h3>
                  <p className='text-gray-400'>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Profile Section */}
      <section className='py-20 bg-[#0A0A0A]'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight'>
            TU PERFIL PROFESIONAL.{" "}
            <span className='text-[#FF0000]'>
              EL ESCAPARATE QUE TE FALTABA.
            </span>
          </h2>
          <p className='text-xl text-center text-gray-400 mb-16 max-w-3xl mx-auto'>
            Un perfil que muestra lo que haces, cómo trabajas y por qué confiar
            en ti. Tarifas, reseñas, resultados, redes y contacto. En un solo
            sitio, con imagen profesional.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {profileBenefits.map((benefit, index) => (
              <div
                key={index}
                className='bg-[#111] rounded-lg overflow-hidden border border-[#222]'>
                <div className='h-48 overflow-hidden'>
                  <img
                    src={benefit.image || "/placeholder.svg"}
                    alt={benefit.title}
                    className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-3'>{benefit.title}</h3>
                  <p className='text-gray-400'>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className='py-20 bg-black'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight'>
            PLANES DE <span className='text-[#FF0000]'>SUSCRIPCIÓN</span>
          </h2>
          <p className='text-xl text-center text-gray-400 mb-16 max-w-3xl mx-auto'>
            Elige el plan que mejor se adapte a tus necesidades
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto'>
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                icon={plan.icon}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                cta={plan.cta}
                highlighted={plan.highlighted}
                badge={plan.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className='relative py-20 bg-[#0A0A0A]'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#FF0000]/20 to-transparent'></div>
        <div className='relative z-10 container mx-auto px-4 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight'>
            ESTÁS A UN CLIC DE PASAR DE ENTRENADOR A{" "}
            <span className='text-[#FF0000]'>REFERENTE</span>.
          </h2>
          <p className='text-xl mb-8 max-w-3xl mx-auto'>
            TrainerPT convierte tu trabajo en una experiencia. Para ti, y para
            tus clientes. Regístrate gratis. Monta tu perfil. Y cambia cómo te
            ven.
          </p>
          <div className='flex justify-center'>
            <Button
              size='lg'
              className='text-lg px-8 py-6 bg-[#FF0000] hover:bg-[#FF0000]/90 text-white w-full max-w-xl'
              asChild>
              <Link href='/register'>EMPIEZA GRATIS CON 3 CLIENTES</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black py-12 border-t border-[#222]'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-xl font-bold mb-4'>UBICACIÓN & CONTACTO</h3>
              <p className='text-gray-400 mb-2'>
                <span className='text-[#FF0000] font-medium'>Dirección:</span>{" "}
                Calle Principal 123, Madrid
              </p>
              <p className='text-gray-400 mb-2'>
                <span className='text-[#FF0000] font-medium'>Email:</span>{" "}
                info@trainpt.com
              </p>
              <p className='text-gray-400 mb-2'>
                <span className='text-[#FF0000] font-medium'>Teléfono:</span>{" "}
                +34 91 123 45 67
              </p>
              <p className='text-gray-400 mb-2'>
                <span className='text-[#FF0000] font-medium'>Horario:</span>
                <br />
                Lunes a Viernes: 08:00 - 22:00
                <br />
                Sábado y Domingo: 09:00 - 20:00
              </p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>ENLACES RÁPIDOS</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>Sobre Nosotros</li>
                <li>Clases</li>
                <li>Horarios</li>
                <li>Ventajas</li>
                <li>Precios</li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>SOCIAL</h4>
              <ul className='space-y-2 text-gray-400'>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>YouTube</li>
                <li>TikTok</li>
              </ul>
            </div>
            <div>
              <div className='bg-[#FF0000] p-6 rounded-lg text-center'>
                <div className='text-white text-5xl font-bold mb-2'>
                  TRAIN PT
                </div>
                <p className='text-white'>
                  La plataforma definitiva para entrenamiento personal
                </p>
              </div>
            </div>
          </div>
          <div className='border-t border-[#222] mt-12 pt-8 text-center text-gray-500'>
            <p>
              © {new Date().getFullYear()} Train PT. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureListItem({ text }: { text: string }) {
  return (
    <li className='flex items-center gap-3'>
      <div className='text-[#FF0000]'>
        <CheckCircle2 className='h-5 w-5' />
      </div>
      <span>{text}</span>
    </li>
  );
}

function PricingCard({
  icon,
  title,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`rounded-lg overflow-hidden relative ${
        highlighted ? "bg-[#FF0000]" : "bg-[#111] border border-[#222]"
      }`}>
      {badge && (
        <div className='absolute top-0 right-0 bg-white text-[#FF0000] text-xs font-bold px-3 py-1 rounded-bl-lg'>
          {badge}
        </div>
      )}
      <div className={`p-6 text-center ${highlighted ? "text-white" : ""}`}>
        <div className='flex justify-center mb-4'>
          <div className={`${highlighted ? "text-white" : "text-[#FF0000]"}`}>
            {icon}
          </div>
        </div>
        <h3 className='text-xl font-bold mb-2'>{title}</h3>
        <div className='text-4xl font-bold mb-2'>
          {price}
          <span className='text-xl'>{period}</span>
        </div>
        <p
          className={`mb-6 ${highlighted ? "text-white/80" : "text-gray-400"}`}>
          {description}
        </p>
        <ul className='space-y-3 text-left mb-6'>
          {features.map((feature, index) => (
            <li key={index} className='flex items-start gap-3'>
              <div
                className={`mt-1 ${
                  highlighted ? "text-white" : "text-[#FF0000]"
                }`}>
                <CheckCircle2 className='h-5 w-5' />
              </div>
              <span className={highlighted ? "text-white" : "text-gray-300"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <Button
          className={`w-full ${
            highlighted
              ? "bg-white text-[#FF0000] hover:bg-gray-100"
              : "bg-[#FF0000] text-white hover:bg-[#FF0000]/90"
          }`}>
          {cta} <ArrowRight className='ml-2 h-5 w-5' />
        </Button>
      </div>
    </div>
  );
}
