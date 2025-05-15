"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileTariffs() {
  const [tariffs, setTariffs] = useState([
    { id: 1, name: "Básico", price: 30 },
    { id: 2, name: "Premium", price: 50 },
  ]);
  const [newTariff, setNewTariff] = useState({ name: "", price: "" });

  const handleAddTariff = () => {
    if (newTariff.name && newTariff.price) {
      setTariffs([
        ...tariffs,
        {
          id: Date.now(),
          name: newTariff.name,
          price: Number(newTariff.price),
        },
      ]);
      setNewTariff({ name: "", price: "" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Tarifas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {tariffs.map((tariff) => (
            <div key={tariff.id} className='flex justify-between items-center'>
              <span>{tariff.name}</span>
              <span>€{tariff.price}/mes</span>
            </div>
          ))}
          <div className='pt-4 border-t'>
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
              <Button onClick={handleAddTariff}>Añadir</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
