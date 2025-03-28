import { FormsDashboard } from "@/components/forms/forms-dashboard"
import { FormsList } from "@/components/forms/forms-list"
import { NewFormButton } from "@/components/forms/new-form-button"

export default function FormsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Formularios</h1>
        <NewFormButton />
      </div>
      <FormsDashboard />
      <FormsList />
    </div>
  )
}

