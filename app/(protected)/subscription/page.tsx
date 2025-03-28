import { SubscriptionStatus } from "@/components/subscription/subscription-status"
import { SubscriptionPlans } from "@/components/subscription/subscription-plans"
import { PaymentHistory } from "@/components/subscription/payment-history"

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Suscripción</h1>
      <SubscriptionStatus />
      <SubscriptionPlans />
      <PaymentHistory />
    </div>
  )
}

