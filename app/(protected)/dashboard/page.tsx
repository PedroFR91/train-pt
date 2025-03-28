"use client";
import { ClientDashboard } from "@/components/dashboard/client-dashboard";
import { TrainerDashboard } from "@/components/dashboard/trainer-dashboard";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardPage() {
  const { isTrainer, isClient } = useAuth();

  return (
    <div className='container p-6 mx-auto'>
      {isTrainer() ? (
        <TrainerDashboard />
      ) : isClient() ? (
        <ClientDashboard />
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}
