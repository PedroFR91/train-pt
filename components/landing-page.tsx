import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted className="absolute w-auto min-w-full min-h-full max-w-none">
          <source
            src="https://videos.pexels.com/video-files/4057408/4057408-uhd_2732_1440_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Transforma tu cuerpo, cambia tu vida</h1>
          <p className="text-xl mb-8">Entrenamiento personalizado para alcanzar tus metas</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">¿Por qué elegir Train PT?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Entrenadores expertos"
              description="Nuestros entrenadores certificados te guiarán en cada paso de tu viaje fitness."
              imageUrl="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <FeatureCard
              title="Planes personalizados"
              description="Rutinas y planes de nutrición adaptados a tus objetivos y necesidades específicas."
              imageUrl="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <FeatureCard
              title="Seguimiento constante"
              description="Monitoreo de tu progreso y ajustes en tiempo real para maximizar tus resultados."
              imageUrl="https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="Train PT cambió mi vida. Perdí 20 kilos y me siento mejor que nunca."
              author="María G."
              role="Cliente desde hace 6 meses"
            />
            <TestimonialCard
              quote="Los entrenadores son increíbles. Su apoyo y conocimientos han sido fundamentales en mi transformación."
              author="Carlos R."
              role="Cliente desde hace 1 año"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source
            src="https://videos.pexels.com/video-files/4754030/4754030-uhd_2732_1440_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Listo para comenzar tu transformación?</h2>
          <p className="text-xl mb-8">
            Únete a Train PT hoy y da el primer paso hacia una vida más saludable y en forma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
  return (
    <Card className="bg-gray-800 border-none">
      <CardContent className="p-6">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <Card className="bg-gray-700 border-none">
      <CardContent className="p-6">
        <p className="text-lg mb-4">"{quote}"</p>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </CardContent>
    </Card>
  )
}

