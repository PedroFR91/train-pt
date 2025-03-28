"use client"

import {
  Home,
  User,
  Dumbbell,
  FileText,
  FolderOpen,
  Search,
  Users,
  Utensils,
  Calendar,
  BarChart,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isTrainer, isClient } = useAuth()

  // Menú para entrenadores
  const trainerMenuItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard" },
    { title: "Clientes", icon: Users, href: "/clients" },
    { title: "Rutinas", icon: Dumbbell, href: "/routines" },
    { title: "Dietas", icon: Utensils, href: "/diets" },
    { title: "Formularios", icon: FileText, href: "/forms" },
    { title: "Archivos", icon: FolderOpen, href: "/files" },
    { title: "Mensajes", icon: MessageCircle, href: "/messages" },
    { title: "Mi Perfil", icon: User, href: "/profile" },
  ]

  // Menú para clientes
  const clientMenuItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard" },
    { title: "Mis Rutinas", icon: Dumbbell, href: "/my-routines" },
    { title: "Mi Dieta", icon: Utensils, href: "/my-diet" },
    { title: "Mi Progreso", icon: BarChart, href: "/my-progress" },
    { title: "Mis Formularios", icon: FileText, href: "/my-forms" },
    { title: "Mis Archivos", icon: FolderOpen, href: "/my-files" },
    { title: "Mensajes", icon: MessageCircle, href: "/messages" },
    { title: "Buscar Entrenadores", icon: Search, href: "/trainers" },
  ]

  // Determinar qué menú mostrar según el rol
  const menuItems = isTrainer() ? trainerMenuItems : clientMenuItems

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Train PT" className="h-8 w-8" />
          <span className="font-bold text-lg">Train PT</span>
        </div>
        <NotificationDropdown />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isTrainer() && (
          <SidebarGroup>
            <SidebarGroupLabel>Configuración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/profile/rates"} tooltip="Tarifas">
                    <Link href="/profile/rates">
                      <Settings className="h-5 w-5" />
                      <span>Tarifas</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/profile/public"} tooltip="Perfil Público">
                    <Link href="/profile/public">
                      <User className="h-5 w-5" />
                      <span>Perfil Público</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {isClient() && (
          <SidebarGroup>
            <SidebarGroupLabel>Mi Cuenta</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/subscription"} tooltip="Suscripción">
                    <Link href="/subscription">
                      <Calendar className="h-5 w-5" />
                      <span>Suscripción</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/profile"} tooltip="Mi Perfil">
                    <Link href="/profile">
                      <User className="h-5 w-5" />
                      <span>Mi Perfil</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.picture || undefined} alt={user?.firstName} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{isTrainer() ? "Entrenador" : "Cliente"}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

