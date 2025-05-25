// components/routines/RoutineWizardStep.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

type Workout = {
  id: number;
  name: string;
  description?: string;
};

type Routine = {
  id?: number;
  name: string;
  description?: string;
  goal?: string;
  duration: number;
  workoutIds: number[];
  schedule?: Record<string, number>; // e.g. { Lunes: workoutId, ... }
};

const DAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

type Props = {
  step: number;
  initial?: Partial<Routine>;
  onSaved: () => void;
};

export function RoutineWizardStep({ step, initial, onSaved }: Props) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number[]>(initial?.workoutIds || []);
  const [schedule, setSchedule] = useState<Record<string, number>>(
    initial?.schedule || {}
  );

  const form = useForm<Routine>({
    defaultValues: {
      name: initial?.name || "",
      description: initial?.description || "",
      goal: initial?.goal || "",
      duration: initial?.duration || 0,
      workoutIds: initial?.workoutIds || [],
      schedule: initial?.schedule || {},
    },
  });

  // Paso 1: detalles
  if (step === 0) {
    return (
      <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
        <Input
          {...form.register("name", { required: true })}
          placeholder='Nombre de la rutina'
        />
        <Input {...form.register("description")} placeholder='Descripción' />
        <Input {...form.register("goal")} placeholder='Meta (objetivo)' />
        <Input
          type='number'
          {...form.register("duration", { valueAsNumber: true })}
          placeholder='Duración (días o sem.)'
        />
      </form>
    );
  }

  // Paso 2: selección de workouts
  if (step === 1) {
    useEffect(() => {
      setLoading(true);
      axios
        .get<Workout[]>("/workouts")
        .then((r) => setWorkouts(r.data))
        .finally(() => setLoading(false));
    }, []);

    const toggle = (id: number) =>
      setSelected((p) =>
        p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
      );

    useEffect(() => {
      form.setValue("workoutIds", selected);
    }, [selected]);

    return (
      <div className='space-y-2 max-h-60 overflow-y-auto'>
        {loading ? (
          <p>Cargando entrenamientos…</p>
        ) : (
          workouts.map((w) => (
            <div key={w.id} className='flex items-center gap-2'>
              <Checkbox
                checked={selected.includes(w.id)}
                onCheckedChange={() => toggle(w.id)}
              />
              <span>{w.name}</span>
            </div>
          ))
        )}
      </div>
    );
  }

  // Paso 3: asignar a días
  if (step === 2) {
    const toggleDay = (day: string) => {
      setSchedule((s) => {
        const copy = { ...s };
        if (copy[day]) delete copy[day];
        else copy[day] = selected[0] || 0; // default al primer workout
        form.setValue("schedule", copy);
        return copy;
      });
    };
    const changeAssign = (day: string, wid: number) => {
      setSchedule((s) => {
        const copy = { ...s, [day]: wid };
        form.setValue("schedule", copy);
        return copy;
      });
    };

    return (
      <div className='space-y-4 max-h-64 overflow-y-auto'>
        {DAYS.map((day) => (
          <div key={day} className='flex flex-col'>
            <label className='inline-flex items-center gap-2'>
              <Checkbox
                checked={!!schedule[day]}
                onCheckedChange={() => toggleDay(day)}
              />
              {day}
            </label>
            {schedule[day] && (
              <Select
                value={String(schedule[day])}
                onValueChange={(v) => changeAssign(day, Number(v))}>
                <SelectTrigger className='w-48'>
                  <span>
                    {workouts.find((w) => w.id === schedule[day])?.name ??
                      "Selecciona workout"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {workouts.map((w) => (
                    <SelectItem key={w.id} value={String(w.id)}>
                      {w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Paso 4: revisión + submit
  if (step === 3) {
    const data = form.getValues();
    const handleSave = async () => {
      try {
        if (initial?.id) {
          await axios.put(`/routines/${initial.id}`, {
            ...data,
            workoutIds: selected,
            schedule,
          });
        } else {
          await axios.post("/routines", {
            ...data,
            workoutIds: selected,
            schedule,
          });
        }
        onSaved();
      } catch {
        alert("Error guardando rutina");
      }
    };
    return (
      <div className='space-y-2'>
        <p>
          <strong>Nombre:</strong> {data.name}
        </p>
        <p>
          <strong>Desc:</strong> {data.description}
        </p>
        <p>
          <strong>Meta:</strong> {data.goal}
        </p>
        <p>
          <strong>Durac:</strong> {data.duration}
        </p>
        <p>
          <strong>Workouts:</strong> {data.workoutIds.join(", ")}
        </p>
        <p>
          <strong>Schedule:</strong>
        </p>
        {Object.entries(schedule).map(([day, wid]) => (
          <p key={day}>
            {day}: {workouts.find((w) => w.id === wid)?.name}
          </p>
        ))}
        <Button onClick={handleSave}>Guardar Rutina</Button>
      </div>
    );
  }

  return null;
}
