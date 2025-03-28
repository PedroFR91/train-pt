import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const paymentHistory = [
  { id: 1, date: "2023-06-15", amount: "49.99", status: "Pagado" },
  { id: 2, date: "2023-05-15", amount: "49.99", status: "Pagado" },
  { id: 3, date: "2023-04-15", amount: "49.99", status: "Pagado" },
]

export function PaymentHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Pagos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentHistory.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>€{payment.amount}</TableCell>
                <TableCell>{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

