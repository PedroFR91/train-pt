"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";

type Exercise = {
  id?: number;
  name: string;
  description?: string;
  difficulty: "easy" | "medium" | "hard";
  duration: number;
  muscleGroup: string;
  gifUrl?: string;
};

type Props = {
  step: number;
  initial?: Partial<Exercise>;
  onSaved: () => void;
};

export function ExerciseWizardStep({ step, initial, onSaved }: Props) {
  const [external, setExternal] = useState<Exercise[]>([]);
  const [loadingExt, setLoadingExt] = useState(false);

  const form = useForm<Exercise>({
    defaultValues: {
      name: initial?.name || "",
      description: initial?.description || "",
      difficulty: initial?.difficulty || "easy",
      duration: initial?.duration || 0,
      muscleGroup: initial?.muscleGroup || "",
      gifUrl: initial?.gifUrl,
    },
  });

  // Paso 0: importar de API externa
  const loadExternal = async () => {
    setLoadingExt(true);
    try {
      const res = await axios.get<Exercise[]>("/exercises/external");
      setExternal(res.data);
    } finally {
      setLoadingExt(false);
    }
  };

  // Paso 0 UI
  if (step === 0) {
    return (
      <div className='space-y-4'>
        <Button onClick={loadExternal} disabled={loadingExt}>
          {loadingExt ? "Cargando…" : "Cargar de ExerciseDB"}
        </Button>
        {external.map((ex) => (
          <div
            key={ex.id}
            className='flex justify-between items-center p-2 border-b'>
            <span>{ex.name}</span>
            <Button variant='link' onClick={() => form.reset(ex)}>
              Seleccionar
            </Button>
          </div>
        ))}
      </div>
    );
  }

  // Paso 1: formulario manual
  if (step === 1) {
    return (
      <form onSubmit={form.handleSubmit(() => {})} className='space-y-4'>
        <Input
          {...form.register("name", { required: true })}
          placeholder='Nombre'
        />
        <Input {...form.register("description")} placeholder='Descripción' />
        <Select {...form.register("difficulty")}>
          <SelectTrigger>
            <span>{form.getValues("difficulty")}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='easy'>Easy</SelectItem>
            <SelectItem value='medium'>Medium</SelectItem>
            <SelectItem value='hard'>Hard</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type='number'
          {...form.register("duration", { valueAsNumber: true })}
          placeholder='Duración (min)'
        />
        <Input {...form.register("muscleGroup")} placeholder='Grupo muscular' />
      </form>
    );
  }

  // Paso 2: revisión + submit
  if (step === 2) {
    const values = form.getValues();
    const handleSave = async () => {
      try {
        if (initial?.id) {
          await axios.put(`/exercises/${initial.id}`, values);
        } else {
          await axios.post("/exercises", values);
        }
        onSaved();
      } catch {
        alert("Error guardando ejercicio");
      }
    };
    return (
      <div className='space-y-2'>
        <p>
          <strong>Nombre:</strong> {values.name}
        </p>
        <p>
          <strong>Desc:</strong> {values.description}
        </p>
        <p>
          <strong>Diff:</strong> {values.difficulty}
        </p>
        <p>
          <strong>Duración:</strong> {values.duration} min
        </p>
        <p>
          <strong>Musc:</strong> {values.muscleGroup}
        </p>
        <Button onClick={handleSave}>Guardar Ejercicio</Button>
      </div>
    );
  }

  return null;
}
