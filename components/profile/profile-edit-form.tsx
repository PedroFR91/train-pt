"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/auth-context";

// Asegúrate de que el tipo User tenga la propiedad 'bio'
type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  bio?: string; // <-- Ensure this line exists
  specialization?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  picture?: string;
  role?: string;
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Upload } from "lucide-react";

// Esquema de validación para el formulario
const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Introduce un email válido" }),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
  specialization: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileEditForm() {
  const { user, updateUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Inicializar el formulario con los datos del usuario
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      bio: user?.bio ?? "",
      specialization: user?.specialization ?? "",
      facebook: user?.facebook ?? "",
      twitter: user?.twitter ?? "",
      instagram: user?.instagram ?? "",
    },
  });

  // Resetear valores cuando cambie el user
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
        specialization: user.specialization,
        facebook: user.facebook,
        twitter: user.twitter,
        instagram: user.instagram,
      });
    }
  }, [user, form]);

  // Manejar subida de foto de perfil
  const handleProfilePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vista previa local
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Ajusta este endpoint al que tenga tu backend
      const { data } = await axios.post<{
        pictureUrl: string;
      }>("/users/me/picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Foto de perfil actualizada",
        description: "Tu foto de perfil se ha actualizado correctamente",
      });

      // Actualiza el user en contexto
      if (data.pictureUrl) {
        await updateUser({ picture: data.pictureUrl });
      }
    } catch (err) {
      console.error("Error subiendo foto de perfil:", err);
      toast({
        title: "Error",
        description: "No se pudo subir la foto de perfil",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Envío de formulario de datos
  const onSubmit = async (values: ProfileFormValues) => {
    try {
      // updateUser ya usa axios PUT /users/me internamente
      await updateUser(values);
      toast({
        title: "Perfil actualizado",
        description: "Tu perfil se ha actualizado correctamente",
      });
    } catch (err) {
      console.error("Error actualizando perfil:", err);
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Perfil</CardTitle>
        <CardDescription>
          Actualiza tu información personal y de contacto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col md:flex-row gap-6 mb-6'>
          <div className='flex flex-col items-center space-y-4'>
            <Avatar className='h-32 w-32'>
              <AvatarImage
                src={previewUrl ?? user?.picture ?? "/placeholder.svg"}
                alt={user?.firstName}
              />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className='relative'>
              <Button variant='outline' disabled={isUploading}>
                <label className='flex w-full cursor-pointer items-center justify-center'>
                  {isUploading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className='mr-2 h-4 w-4' />
                      Cambiar Foto
                    </>
                  )}
                  <input
                    type='file'
                    className='hidden'
                    onChange={handleProfilePictureUpload}
                    accept='image/*'
                    disabled={isUploading}
                  />
                </label>
              </Button>
            </div>
          </div>

          <div className='flex-1'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biografía</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormDescription>
                        Cuéntanos sobre ti, tu experiencia y tus objetivos.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {user?.role === "trainer" && (
                  <FormField
                    control={form.control}
                    name='specialization'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialización</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Por ejemplo: Pérdida de peso, Musculación,
                          Entrenamiento funcional, etc.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Redes Sociales</h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {["facebook", "twitter", "instagram"].map((socialField) => (
                      <FormField
                        key={socialField}
                        control={form.control}
                        name={socialField as keyof ProfileFormValues}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {socialField.charAt(0).toUpperCase() +
                                socialField.slice(1)}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={`URL de ${
                                  socialField.charAt(0).toUpperCase() +
                                  socialField.slice(1)
                                }`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                <Button type='submit' disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
