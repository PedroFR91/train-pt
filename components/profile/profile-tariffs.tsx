"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

type Rate = {
  id: number;
  name: string;
  price: number;
  currency: string;
  duration: string;
  sessionType: string;
  trainerId: number;
};

type NewRate = {
  name: string;
  price: string;
};

export function ProfileRates() {
  const { user } = useAuth();
  const trainerId = user?.id;
  const [rates, setRates] = useState<Rate[]>([]);
  const [newRate, setNewRate] = useState<NewRate>({ name: "", price: "" });
  const [loading, setLoading] = useState<boolean>(false);

  // 1) Al montar, cargar las rates del trainer
  useEffect(() => {
    if (!trainerId) return;
    setLoading(true);
    axios
      .get<Rate[]>("/rates", { params: { trainerId } })
      .then(({ data }) => setRates(data))
      .catch((err) => {
        console.error("Error fetching rates:", err);
        toast({
          title: "Error",
          description: "No se pudieron cargar tus rates",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  }, [trainerId]);

  // 2) Al añadir, crear rate en backend y refrescar lista
  const handleAddRate = async () => {
    if (!trainerId) {
      toast({ title: "Error", description: "Usuario no autenticado" });
      return;
    }
    if (!newRate.name || !newRate.price) {
      toast({ title: "Atención", description: "Rellena nombre y precio" });
      return;
    }

    const priceNum = Number(newRate.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast({ title: "Atención", description: "Precio no válido" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: newRate.name,
        price: priceNum,
        currency: "EUR", // o lo que uses
        duration: "monthly", // ajusta según tu modelo
        sessionType: "individual", // ajusta según tu modelo
        trainerId,
      };
      const { data } = await axios.post<Rate>("/rates", payload);
      setRates((prev) => [...prev, data]);
      setNewRate({ name: "", price: "" });
      toast({ title: "Hecho", description: "Rate creada" });
    } catch (err) {
      console.error("Error creating rate:", err);
      toast({
        title: "Error",
        description: "No se pudo crear la rate",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Rates</CardTitle>
      </CardHeader>

      <CardContent>
        {loading && <p>Cargando…</p>}

        <div className='space-y-4'>
          {rates.map((rate) => (
            <div key={rate.id} className='flex justify-between items-center'>
              <span>{rate.name}</span>
              <span>€{rate.price}/mes</span>
            </div>
          ))}
        </div>

        <div className='pt-4 border-t mt-4'>
          <h3 className='font-semibold mb-2'>Añadir nueva rate</h3>
          <div className='flex gap-2'>
            <div className='flex-grow'>
              <Label htmlFor='rate-name' className='sr-only'>
                Nombre de la rate
              </Label>
              <Input
                id='rate-name'
                placeholder='Nombre de la rate'
                value={newRate.name}
                onChange={(e) =>
                  setNewRate({ ...newRate, name: e.target.value })
                }
              />
            </div>
            <div className='w-24'>
              <Label htmlFor='rate-price' className='sr-only'>
                Precio
              </Label>
              <Input
                id='rate-price'
                placeholder='Precio'
                type='number'
                value={newRate.price}
                onChange={(e) =>
                  setNewRate({ ...newRate, price: e.target.value })
                }
              />
            </div>
            <Button onClick={handleAddRate} disabled={loading}>
              Añadir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
