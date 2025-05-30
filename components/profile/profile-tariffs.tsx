"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/auth-context";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Info, Plus } from "lucide-react";

type Rate = {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  duration: string;
  sessionType: string;
  order: number;
  trainerId: number;
};

// Etiquetas por precio
const getLabel = (price: number) => {
  if (price === 0)
    return { text: "FREE", color: "border-red-500 text-red-500" };
  if (price === 59)
    return { text: "MÁS VENDIDO", color: "border-yellow-500 text-yellow-500" };
  if (price > 59)
    return { text: "PRO", color: "border-blue-500 text-blue-500" };
  return { text: "DESTACADO", color: "border-green-500 text-green-500" };
};

function SortableRateCard({
  rate,
  onEdit,
  onDelete,
}: {
  rate: Rate;
  onEdit: (r: Rate) => void;
  onDelete: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: rate.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const label = getLabel(rate.price);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card className='shadow-md hover:shadow-lg transition relative p-6 bg-white'>
        <div className='absolute top-4 right-4 flex gap-2'>
          <Button size='icon' variant='ghost' onClick={() => onEdit(rate)}>
            <Edit className='w-4 h-4' />
          </Button>
          <Button size='icon' variant='ghost' onClick={() => onDelete(rate.id)}>
            <Trash2 className='w-4 h-4 text-red-500' />
          </Button>
        </div>
        <Badge variant='outline' className={`mb-2 border-2 ${label.color}`}>
          {label.text}
        </Badge>
        <h3 className='text-lg font-bold'>{rate.name}</h3>
        <p className='text-muted-foreground'>{rate.description}</p>
        <p className='text-xl font-semibold mt-1'>
          {rate.price} {rate.currency} / {rate.duration}
        </p>
        <p className='text-sm text-muted-foreground mt-1'>
          Tipo: {rate.sessionType}
        </p>
      </Card>
    </div>
  );
}

export function ProfileRates() {
  const { user } = useAuth();
  const trainerId = user?.id;
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(false);
  const [editRate, setEditRate] = useState<Rate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const emptyRate: Omit<Rate, "id" | "trainerId" | "order"> = {
    name: "",
    description: "",
    price: 0,
    currency: "EUR",
    duration: "monthly",
    sessionType: "individual",
  };

  const [newRate, setNewRate] = useState(emptyRate);

  useEffect(() => {
    if (!trainerId) return;
    setLoading(true);
    axios
      .get<Rate[]>("/rates", { params: { trainerId } })
      .then(({ data }) => setRates(data.sort((a, b) => a.order - b.order)))
      .catch(() =>
        toast({
          title: "Error",
          description: "No se pudieron cargar tus tarifas",
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false));
  }, [trainerId]);

  const handleCreate = async () => {
    if (!trainerId || !newRate.name || newRate.price <= 0) {
      toast({ title: "Completa todos los campos correctamente" });
      return;
    }

    try {
      const payload = { ...newRate, trainerId, order: rates.length };
      const { data } = await axios.post("/rates", payload);
      setRates((prev) => [...prev, data]);
      setNewRate(emptyRate);
      toast({ title: "Tarifa creada" });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo crear la tarifa",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!editRate) return;
    try {
      const { data } = await axios.put(`/rates/${editRate.id}`, editRate);
      setRates((prev) => prev.map((r) => (r.id === data.id ? data : r)));
      setEditRate(null);
      setIsDialogOpen(false);
      toast({ title: "Tarifa actualizada" });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo actualizar",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/rates/${id}`);
      setRates((prev) => prev.filter((r) => r.id !== id));
      toast({ title: "Tarifa eliminada" });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo eliminar",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rates.findIndex((r) => r.id === active.id);
    const newIndex = rates.findIndex((r) => r.id === over.id);
    const reordered = arrayMove(rates, oldIndex, newIndex);

    setRates(reordered);

    try {
      await Promise.all(
        reordered.map((rate, index) =>
          axios.put(`/rates/${rate.id}`, { order: index })
        )
      );
    } catch {
      toast({
        title: "Error",
        description: "No se pudo guardar el nuevo orden",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className='flex justify-between items-center'>
        <CardTitle>Mis Tarifas</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='w-4 h-4 mr-2' /> Añadir
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editRate ? "Editar Tarifa" : "Nueva Tarifa"}
              </DialogTitle>
            </DialogHeader>
            <div className='space-y-4 mt-2'>
              <Input
                placeholder='Nombre'
                value={editRate?.name ?? newRate.name}
                onChange={(e) =>
                  editRate
                    ? setEditRate({ ...editRate, name: e.target.value })
                    : setNewRate({ ...newRate, name: e.target.value })
                }
              />
              <Textarea
                placeholder='Descripción'
                value={editRate?.description ?? newRate.description}
                onChange={(e) =>
                  editRate
                    ? setEditRate({ ...editRate, description: e.target.value })
                    : setNewRate({ ...newRate, description: e.target.value })
                }
              />
              <Input
                type='number'
                placeholder='Precio'
                value={editRate?.price ?? newRate.price}
                onChange={(e) =>
                  editRate
                    ? setEditRate({ ...editRate, price: +e.target.value })
                    : setNewRate({ ...newRate, price: +e.target.value })
                }
              />
              <div className='flex gap-2'>
                <Select
                  value={editRate?.currency ?? newRate.currency}
                  onValueChange={(value) =>
                    editRate
                      ? setEditRate({ ...editRate, currency: value })
                      : setNewRate({ ...newRate, currency: value })
                  }>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Moneda' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='EUR'>EUR</SelectItem>
                    <SelectItem value='USD'>USD</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={editRate?.duration ?? newRate.duration}
                  onValueChange={(value) =>
                    editRate
                      ? setEditRate({ ...editRate, duration: value })
                      : setNewRate({ ...newRate, duration: value })
                  }>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Duración' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='monthly'>Mensual</SelectItem>
                    <SelectItem value='weekly'>Semanal</SelectItem>
                    <SelectItem value='single'>Única</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select
                value={editRate?.sessionType ?? newRate.sessionType}
                onValueChange={(value) =>
                  editRate
                    ? setEditRate({ ...editRate, sessionType: value })
                    : setNewRate({ ...newRate, sessionType: value })
                }>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Tipo de sesión' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='individual'>Individual</SelectItem>
                  <SelectItem value='group'>Grupal</SelectItem>
                  <SelectItem value='online'>Online</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={editRate ? handleUpdate : handleCreate}>
                {editRate ? "Guardar Cambios" : "Crear Tarifa"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}>
          <SortableContext
            items={rates.map((r) => r.id)}
            strategy={verticalListSortingStrategy}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {rates.map((rate) => (
                <SortableRateCard
                  key={rate.id}
                  rate={rate}
                  onEdit={setEditRate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
