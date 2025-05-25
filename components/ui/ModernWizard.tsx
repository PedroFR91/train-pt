// components/ui/ModernWizard.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Steps, Step } from "@/components/ui/steps";
import { motion, AnimatePresence } from "framer-motion";
import { ExerciseWizardStep } from "../../components/ui/ExerciseWizardStep";
import { WorkoutWizardStep } from "../../components/ui/WorkoutWizardStep";
import { RoutineWizardStep } from "../../components/ui/RoutineWizardStep";

const ICONS = {
  exercise: "🏋️",
  workout: "💪",
  routine: "📅",
};

const STEP_DEFS = {
  exercise: [
    { key: "import", title: "Importar", icon: "🔍" },
    { key: "manual", title: "Manual", icon: "✍️" },
    { key: "review", title: "Revisión", icon: "✅" },
  ],
  workout: [
    { key: "details", title: "Detalles", icon: "📝" },
    { key: "select", title: "Ejercicios", icon: "✅" },
    { key: "series", title: "Series", icon: "🏷️" },
    { key: "review", title: "Revisión", icon: "🔍" },
  ],
  routine: [
    { key: "details", title: "Detalles", icon: "📝" },
    { key: "select", title: "Entrenam.", icon: "💪" },
    { key: "schedule", title: "Días", icon: "📅" },
    { key: "review", title: "Revisión", icon: "🔍" },
  ],
} as const;

type Type = keyof typeof STEP_DEFS;

type ModernWizardProps = {
  type: Type;
  initialData?: any;
  onSaved: () => void;
};

export function ModernWizard({
  type,
  initialData,
  onSaved,
}: ModernWizardProps) {
  const steps = STEP_DEFS[type];
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && setOpen(false)}>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-lg'>
            {ICONS[type]}{" "}
            {type === "exercise"
              ? "Ejercicio"
              : type === "workout"
              ? "Entrenamiento"
              : "Rutina"}{" "}
            — Paso {step + 1}/{steps.length}
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className='mb-4'>
          <Steps>
            {steps.map((s, i) => (
              <Step
                key={s.key}
                active={i === step}
                completed={i < step}
                onClick={() => setStep(i)}>
                {s.icon}
              </Step>
            ))}
            <motion.div
              className='absolute bottom-0 left-0 h-0.5 bg-blue-500'
              animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </Steps>
        </div>

        {/* Contenido de cada paso */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={`${type}-${step}`}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            {type === "exercise" && (
              <ExerciseWizardStep
                step={step}
                initial={initialData}
                onSaved={onSaved}
              />
            )}
            {type === "workout" && (
              <WorkoutWizardStep
                step={step}
                initial={initialData}
                onSaved={onSaved}
              />
            )}
            {type === "routine" && (
              <RoutineWizardStep
                step={step}
                initial={initialData}
                onSaved={onSaved}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <DialogFooter className='flex justify-between'>
          <Button variant='outline' onClick={prev} disabled={step === 0}>
            Anterior
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={next}>Siguiente</Button>
          ) : (
            <Button onClick={onSaved}>Confirmar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
