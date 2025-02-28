import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Aircraft } from "@shared/schema";

export default function Fleet() {
  const { data: aircraft, isLoading } = useQuery<Aircraft[]>({
    queryKey: ["/api/aircraft"],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your aircraft fleet and configurations
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aircraft</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Range (km)</TableHead>
              <TableHead>Fuel Cap. (L)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              aircraft?.map((aircraft) => (
                <TableRow key={aircraft.id}>
                  <TableCell className="font-medium">
                    {aircraft.name}
                  </TableCell>
                  <TableCell>{aircraft.type}</TableCell>
                  <TableCell>{aircraft.capacity}</TableCell>
                  <TableCell>{aircraft.range}</TableCell>
                  <TableCell>{aircraft.fuelCapacity}</TableCell>
                  <TableCell>
                    <Badge variant={aircraft.status === "active" ? "success" : "secondary"}>
                      {aircraft.status}
                    </Badge>
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
