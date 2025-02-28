import StatsCards from "@/components/dashboard/stats-cards";
import FuelChart from "@/components/dashboard/fuel-chart";
import FuelPriceForm from "@/components/dashboard/fuel-price-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Overview of your airline operations
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <FuelChart />
          <FuelPriceForm />
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Activity list coming soon...</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Route stats coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}