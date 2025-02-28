import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import type { FuelPrice } from "@shared/schema";

export default function FuelChart() {
  const { data: fuelPrices, isLoading } = useQuery<FuelPrice[]>({
    queryKey: ["/api/fuel-prices", { days: 5 }],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Fuel Price Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          Loading...
        </CardContent>
      </Card>
    );
  }

  const data = fuelPrices?.map(price => ({
    date: format(new Date(price.timestamp), "MMM d"),
    price: price.price
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Price Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#009CDC"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
