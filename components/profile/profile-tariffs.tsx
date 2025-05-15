"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { rateService, type RateData } from "@/services/rate-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

type NewTariff = {
  name: string;
  price: string;
};

export function ProfileTariffs() {
  const { user } = useAuth();
  const trainerId = user?.id;
  const [tariffs, setTariffs] = useState<RateData[]>([]);
  const [newTariff, setNewTariff] = useState<NewTariff>({
    name: "",
    price: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // 1) Al montar, cargar las tarifas del trainer
  useEffect(() => {
    if (!trainerId) return;
    setLoading(true);
    rateService
      .getRatesByTrainer(trainerId)
      .then((res) => {
        if (res.success) {
          setTariffs(res.data ?? []);
        } else {
          throw new Error(res.error || "Error al cargar tarifas");
        }
      })
      .catch((err) => {
        console.error("Error fetching tariffs:", err);
        toast({
          title: "Error",
          description: "No se pudieron cargar tus tarifas",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  }, [trainerId]);

  // 2) Al añadir, crear tarifa en backend y refrescar lista
  const handleAddTariff = async () => {
    if (!trainerId) {
      toast({ title: "Error", description: "Usuario no autenticado" });
      return;
    }
    if (!newTariff.name || !newTariff.price) {
      toast({ title: "Atención", description: "Rellena nombre y precio" });
      return;
    }

    const priceNum = Number(newTariff.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast({ title: "Atención", description: "Precio no válido" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: newTariff.name,
        price: priceNum,
        currency: "EUR", // o lo que uses
        duration: "monthly", // ajusta según tu modelo
        sessionType: "individual", // ajusta según tu modelo
        trainerId,
      };
      const res = await rateService.createRate(payload);
      if (res.success && res.data) {
        if (res.data) {
          setTariffs((prev) => [...prev, res.data as RateData]);
        }
        setNewTariff({ name: "", price: "" });
        toast({ title: "Hecho", description: "Tarifa creada" });
      } else {
        throw new Error(res.error || "Error al crear tarifa");
      }
    } catch (err) {
      console.error("Error creating tariff:", err);
      toast({
        title: "Error",
        description: "No se pudo crear la tarifa",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Tarifas</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Cargando…</p>}
        <div className='space-y-4'>
          {tariffs.map((tariff) => (
            <div key={tariff.id} className='flex justify-between items-center'>
              <span>{tariff.name}</span>
              <span>€{tariff.price}/mes</span>
            </div>
          ))}
        </div>

        <div className='pt-4 border-t mt-4'>
          <h3 className='font-semibold mb-2'>Añadir nueva tarifa</h3>
          <div className='flex gap-2'>
            <div className='flex-grow'>
              <Label htmlFor='tariff-name' className='sr-only'>
                Nombre de la tarifa
              </Label>
              <Input
                id='tariff-name'
                placeholder='Nombre de la tarifa'
                value={newTariff.name}
                onChange={(e) =>
                  setNewTariff({ ...newTariff, name: e.target.value })
                }
              />
            </div>
            <div className='w-24'>
              <Label htmlFor='tariff-price' className='sr-only'>
                Precio
              </Label>
              <Input
                id='tariff-price'
                placeholder='Precio'
                type='number'
                value={newTariff.price}
                onChange={(e) =>
                  setNewTariff({ ...newTariff, price: e.target.value })
                }
              />
            </div>
            <Button onClick={handleAddTariff} disabled={loading}>
              Añadir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
