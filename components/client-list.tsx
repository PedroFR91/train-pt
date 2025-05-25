"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Opcional: reutiliza el tipo User si lo tienes exportado en tu contexto
import { User } from "@/contexts/auth-context";

type Client = User & {
  picture?: string;
  subscription?: { status: "active" | string };
  lastSession?: string;
};

export function ClientList() {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        // Trae todos los usuarios
        const { data: users } = await axios.get<Client[]>("/users");
        // Filtra solo los que sean 'client'
        const onlyClients = users.filter((u) => u.role === "client");
        setClients(onlyClients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(search.toLowerCase()) ||
      client.lastName.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewProfile = (clientId: number) => {
    router.push(`/clients/${clientId}`);
  };

  const handleAssignRoutine = (clientId: number) => {
    router.push(`/clients/${clientId}/assign-routine`);
  };

  const handleSendForm = (clientId: number) => {
    router.push(`/clients/${clientId}/send-form`);
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Buscar clientes...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='pl-8'
          />
        </div>
        <Button onClick={() => router.push("/clients/new")}>
          <Plus className='mr-2 h-4 w-4' />
          Nuevo Cliente
        </Button>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Sesión</TableHead>
              <TableHead className='w-[50px]'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  Cargando clientes...
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage
                          src={client.picture}
                          alt={client.firstName}
                        />
                        <AvatarFallback>
                          {client.firstName.charAt(0)}
                          {client.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='font-medium'>
                          {client.firstName} {client.lastName}
                        </span>
                        <span className='text-sm text-muted-foreground'>
                          {client.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        client.subscription?.status === "active"
                          ? "default"
                          : "secondary"
                      }>
                      {client.subscription?.status === "active"
                        ? "Activo"
                        : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.lastSession || "N/A"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleViewProfile(client.id)}>
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAssignRoutine(client.id)}>
                          Asignar rutina
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSendForm(client.id)}>
                          Enviar formulario
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
