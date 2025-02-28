import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, DollarSign, Fuel, MapPin } from "lucide-react";

const stats = [
  {
    name: "Total Aircraft",
    value: "12",
    icon: Plane,
    change: "+2",
    changeType: "increase",
  },
  {
    name: "Revenue (24h)",
    value: "$45,231",
    icon: DollarSign,
    change: "+11.5%",
    changeType: "increase",
  },
  {
    name: "Fuel Cost",
    value: "$2.75/gal",
    icon: Fuel,
    change: "-3.2%",
    changeType: "decrease",
  },
  {
    name: "Active Routes",
    value: "23",
    icon: MapPin,
    change: "+3",
    changeType: "increase",
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.name}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${
              stat.changeType === "increase" ? "text-[#00A651]" : "text-red-600"
            }`}>
              {stat.change} from last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
