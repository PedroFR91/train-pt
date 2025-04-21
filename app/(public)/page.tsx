import { LandingPage } from "@/components/landing-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <LandingPage />
      <div className='fixed top-4 right-4 flex gap-2 z-20'>
        <Button
          variant='outline'
          className='bg-background/80 backdrop-blur-sm'
          asChild>
          <Link href='/auth/login'>Iniciar Sesión</Link>
        </Button>
        <Button className='bg-primary/80 backdrop-blur-sm' asChild>
          <Link href='/auth/register'>Registrarse</Link>
        </Button>
      </div>
    </div>
  );
}
