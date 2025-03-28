import { TrainerPublicProfile } from "@/components/trainer/trainer-public-profile"

export default function TrainerPublicProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6">
      <TrainerPublicProfile trainerId={params.id} />
    </div>
  )
}

