import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import type { Finance } from "@shared/schema";

export default function FinanceChart() {
  const { data: finances, isLoading } = useQuery<Finance[]>({
    queryKey: ["/api/finances", { days: 30 }],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview (30 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  // Process data for the chart
  const chartData = finances?.reduce((acc: any[], finance) => {
    const date = format(new Date(finance.timestamp), "MMM d");
    const existingDay = acc.find(item => item.date === date);
    
    if (existingDay) {
      if (finance.type === "income") {
        existingDay.income += finance.amount;
      } else {
        existingDay.expenses += finance.amount;
      }
      existingDay.profit = existingDay.income - existingDay.expenses;
    } else {
      acc.push({
        date,
        income: finance.type === "income" ? finance.amount : 0,
        expenses: finance.type === "expense" ? finance.amount : 0,
        profit: finance.type === "income" ? finance.amount : -finance.amount
      });
    }
    
    return acc;
  }, []) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview (30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#00A651" />
              <Bar dataKey="expenses" name="Expenses" fill="#FF6B00" />
              <Bar dataKey="profit" name="Profit" fill="#009CDC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
