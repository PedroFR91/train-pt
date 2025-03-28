import { LandingPage } from "@/components/landing-page"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      <LandingPage />
      <div className="fixed top-4 right-4">
        <Button asChild>
          <Link href="/dashboard">Ir al Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

