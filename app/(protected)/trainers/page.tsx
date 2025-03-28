import { TrainerList } from "@/components/subscription/TrainerList"

export default function TrainersPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Encuentra tu Entrenador Personal</h1>
      <TrainerList />
    </div>
  )
}

