import { ClientList } from "@/components/client-list";
import { CalendarWrapper } from "@/components/calendar-wrapper";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TrainerDashboard() {
  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      {/* Sección principal - Lista de clientes */}
      <div className='flex-1 space-y-6'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>12</div>
              <p className='text-xs text-muted-foreground'>
                +2 desde el último mes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Clientes Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>8</div>
              <p className='text-xs text-muted-foreground'>
                +1 desde el último mes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Ingresos Mensuales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>€2,500</div>
              <p className='text-xs text-muted-foreground'>
                +15% desde el mes pasado
              </p>
            </CardContent>
          </Card>
        </div>
        <ClientList />
      </div>

      {/* Barra lateral - Calendario */}
      <div className='w-full lg:w-[350px]'>
        <Card>
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
          </CardHeader>
          <CardContent className='p-0'></CardContent>
        </Card>
      </div>
    </div>
  );
}
