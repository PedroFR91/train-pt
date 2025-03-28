import { ProfileEditForm } from "@/components/profile/profile-edit-form"
import { ProfileTariffs } from "@/components/profile/profile-tariffs"
import { ProfileImages } from "@/components/profile/profile-images"

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      <ProfileEditForm />
      <div className="grid gap-8 md:grid-cols-2">
        <ProfileTariffs />
        <ProfileImages />
      </div>
    </div>
  )
}

