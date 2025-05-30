"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

type ClientImage = {
  id: number;
  imageUrl: string;
};

export function ProfileImages() {
  const { user } = useAuth();
  const [images, setImages] = useState<ClientImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // 🔄 Cargar imágenes del entrenador
  useEffect(() => {
    if (!user?.id) return;
    axios
      .get<ClientImage[]>("/client-images", { params: { trainerId: user.id } })
      .then((res) => setImages(res.data))
      .catch(() =>
        toast({
          title: "Error",
          description: "No se pudieron cargar las imágenes",
          variant: "destructive",
        })
      );
  }, [user]);

  // ⬆️ Subir nueva imagen
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("trainerId", user.id.toString());

    try {
      const { data } = await axios.post<ClientImage>(
        "/client-images",
        formData
      );
      setImages((prev) => [...prev, data]);
      toast({ title: "Imagen subida correctamente" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo subir la imagen",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // ❌ Eliminar imagen
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/client-images/${id}`);
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast({ title: "Imagen eliminada correctamente" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la imagen",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imágenes de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-4 mb-4'>
          {images.map((image) => (
            <div key={image.id} className='relative group'>
              <img
                src={image.imageUrl}
                alt={`Cliente ${image.id}`}
                className='w-full h-32 object-cover rounded'
              />
              <button
                onClick={() => handleDelete(image.id)}
                className='absolute top-1 right-1 p-1 bg-white rounded-full shadow group-hover:opacity-100 opacity-0 transition'
                title='Eliminar'>
                <Trash2 className='h-4 w-4 text-red-500' />
              </button>
            </div>
          ))}
        </div>
        <Button variant='outline' className='w-full' disabled={isUploading}>
          <label className='cursor-pointer w-full text-center'>
            {isUploading ? "Subiendo..." : "Subir Imagen"}
            <input
              type='file'
              className='hidden'
              onChange={handleImageUpload}
              accept='image/*'
            />
          </label>
        </Button>
      </CardContent>
    </Card>
  );
}
