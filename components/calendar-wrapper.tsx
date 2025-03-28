"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";

// Eventos de ejemplo
const events = [
  { date: new Date(2024, 1, 21), count: 1 },
  { date: new Date(2024, 1, 22), count: 2 },
  { date: new Date(2024, 1, 25), count: 1 },
];

export function CalendarWrapper() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className='border-0 shadow-none'>
      <CardContent className='p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          locale={es}
          className='w-full'
          modifiers={{
            hasEvent: (date) =>
              events.some(
                (event) =>
                  event.date.getDate() === date.getDate() &&
                  event.date.getMonth() === date.getMonth()
              ),
          }}
          modifiersStyles={{
            hasEvent: {
              fontWeight: "bold",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
