import StatsCards from "@/components/dashboard/stats-cards";
import FuelChart from "@/components/dashboard/fuel-chart";

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
        <FuelChart />
        
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
