// components/routines/WorkoutWizardStep.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

type Exercise = {
  id: number;
  name: string;
  duration: number;
  difficulty: string;
};

type Workout = {
  id?: number;
  name: string;
  description?: string;
  exerciseIds: number[];
  series?: Record<number, string[]>; // comentarios por serie
};

type Props = {
  step: number;
  initial?: Partial<Workout>;
  onSaved: () => void;
};

export function WorkoutWizardStep({ step, initial, onSaved }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number[]>(
    initial?.exerciseIds || []
  );
  const [series, setSeries] = useState<Record<number, string[]>>(
    initial?.series || {}
  );

  const form = useForm<Workout>({
    defaultValues: {
      name: initial?.name || "",
      description: initial?.description || "",
      exerciseIds: initial?.exerciseIds || [],
      series: initial?.series || {},
    },
  });

  // Paso 1: detalles
  if (step === 0) {
    return (
      <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
        <Input
          {...form.register("name", { required: true })}
          placeholder='Nombre del entrenamiento'
        />
        <Input {...form.register("description")} placeholder='Descripción' />
      </form>
    );
  }

  // Paso 2: selección de ejercicios
  if (step === 1) {
    useEffect(() => {
      setLoading(true);
      axios
        .get<Exercise[]>("/exercises")
        .then((res) => setExercises(res.data))
        .finally(() => setLoading(false));
    }, []);

    const toggle = (id: number) =>
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );

    useEffect(() => {
      form.setValue("exerciseIds", selected);
    }, [selected]);

    return (
      <div className='space-y-2 max-h-64 overflow-y-auto'>
        {loading ? (
          <p>Cargando ejercicios…</p>
        ) : (
          exercises.map((ex) => (
            <div key={ex.id} className='flex items-center gap-2'>
              <Checkbox
                checked={selected.includes(ex.id)}
                onCheckedChange={() => toggle(ex.id)}
              />
              <span>{ex.name}</span>
            </div>
          ))
        )}
      </div>
    );
  }

  // Paso 3: series por ejercicio
  if (step === 2) {
    // Asegura series[exId] existe
    selected.forEach((id) => {
      if (!series[id]) series[id] = [];
    });

    const addSerie = (id: number) => {
      series[id].push("");
      setSeries({ ...series });
      form.setValue("series", series);
    };
    const changeSerie = (id: number, si: number, value: string) => {
      series[id][si] = value;
      setSeries({ ...series });
      form.setValue("series", series);
    };

    return (
      <div className='space-y-4 max-h-64 overflow-y-auto'>
        {selected.length === 0 && <p>No hay ejercicios seleccionados.</p>}
        {selected.map((id) => {
          const ex = exercises.find((e) => e.id === id);
          return (
            <div key={id} className='p-2 border rounded'>
              <h4 className='font-medium'>{ex?.name}</h4>
              <Button size='sm' onClick={() => addSerie(id)}>
                + Serie
              </Button>
              {series[id].map((comment, si) => (
                <Input
                  key={si}
                  placeholder={`Comentario serie ${si + 1}`}
                  value={comment}
                  onChange={(e) => changeSerie(id, si, e.target.value)}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  // Paso 4: revisión + submit
  if (step === 3) {
    const data = form.getValues();
    const handleSave = async () => {
      try {
        if (initial?.id) {
          await axios.put(`/workouts/${initial.id}`, {
            ...data,
            exerciseIds: selected,
            series,
          });
        } else {
          await axios.post("/workouts", {
            ...data,
            exerciseIds: selected,
            series,
          });
        }
        onSaved();
      } catch {
        alert("Error guardando entrenamiento");
      }
    };
    return (
      <div className='space-y-2'>
        <p>
          <strong>Nombre:</strong> {data.name}
        </p>
        <p>
          <strong>Descripción:</strong> {data.description}
        </p>
        <p>
          <strong>Ejercicios:</strong> {data.exerciseIds.join(", ")}
        </p>
        <p>
          <strong>Series:</strong>
        </p>
        {Object.entries(series).map(([id, arr]) => (
          <p key={id}>
            Ej {id}: {arr.join(" | ")}
          </p>
        ))}
        <Button onClick={handleSave}>Guardar Entrenamiento</Button>
      </div>
    );
  }

  return null;
}
