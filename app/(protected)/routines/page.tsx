// app/(protected)/routines/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { RoutinesDashboard } from "@/components/routines/routines-dashboard";
import { RoutinesList } from "@/components/routines/routines-list";
import { Button } from "@/components/ui/button";
import { ModernWizard } from "@/components/ui/ModernWizard";

import { Routine } from "../../../types/routine";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(false);

  // Control del wizard
  const [wizardOpen, setWizardOpen] = useState(false);
  const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);

  // 1) Carga inicial de rutinas
  const fetchRoutines = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Routine[]>("/routines");
      setRoutines(res.data);
    } catch (err) {
      console.error("Error cargando rutinas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  // 2) Abrir wizard para nueva rutina
  const handleNew = () => {
    setActiveRoutine(null);
    setWizardOpen(true);
  };

  // 3) Abrir wizard para edición
  const handleEdit = (routine: Routine) => {
    setActiveRoutine(routine);
    setWizardOpen(true);
  };

  // 4) Callback tras guardar (crear o actualizar)
  const handleSaved = () => {
    setWizardOpen(false);
    fetchRoutines();
  };

  return (
    <div className='container mx-auto p-6 space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Rutinas</h1>
        <Button onClick={handleNew}>+ Nueva Rutina</Button>
      </div>

      {/* Dashboard puede seguir usando datos fetch propios, 
          o recibir `routines` como prop si lo prefieres */}
      <RoutinesDashboard />

      {/* Listado de rutinas: le pasamos la lista y el handler de edición */}
      <RoutinesList routines={routines} onEdit={handleEdit} />

      {/* El wizard para crear/editar */}
      {wizardOpen && (
        <ModernWizard
          type='routine'
          initialData={activeRoutine ?? undefined}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
