import { RoutinesDashboard } from "@/components/routines/routines-dashboard"
import { RoutinesList } from "@/components/routines/routines-list"
import { NewRoutineButton } from "@/components/routines/new-routine-button"

export default function RoutinesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Rutinas</h1>
        <NewRoutineButton />
      </div>
      <RoutinesDashboard />
      <RoutinesList />
    </div>
  )
}

