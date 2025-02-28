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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Aircraft } from "@shared/schema";
import AircraftConfigModal from "@/components/fleet/aircraft-config-modal";

export default function Fleet() {
  const { data: aircraft, isLoading } = useQuery<Aircraft[]>({
    queryKey: ["/api/aircraft"],
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your aircraft fleet and configurations
          </p>
        </div>
        <Button className="bg-[#003366] hover:bg-[#004480]">
          <Plus className="h-4 w-4 mr-2" />
          Add Aircraft
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aircraft</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Range (km)</TableHead>
              <TableHead>Fuel Cap. (L)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
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
                    <Badge 
                      variant={aircraft.status === "active" ? "default" : "secondary"}
                      className={
                        aircraft.status === "active" 
                          ? "bg-[#00A651] hover:bg-[#00A651]" 
                          : ""
                      }
                    >
                      {aircraft.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <AircraftConfigModal aircraft={aircraft} />
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