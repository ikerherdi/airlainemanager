import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Settings, MapPin } from "lucide-react";
import type { Aircraft, Route } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

interface Props {
  aircraft: Aircraft;
  trigger?: React.ReactNode;
}

export default function AircraftConfigModal({ aircraft, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const { data: routes } = useQuery<Route[]>({
    queryKey: ["/api/routes"],
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{aircraft.name} Configuration</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="mt-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <div className="mt-1">
                  <Button
                    variant={aircraft.status === "active" ? "destructive" : "default"}
                    onClick={() => {
                      toast({
                        title: "Status updated",
                        description: `Aircraft status set to ${aircraft.status === "active" ? "maintenance" : "active"}`,
                      });
                    }}
                  >
                    {aircraft.status === "active" ? "Set to Maintenance" : "Set to Active"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="routes" className="space-y-4">
            <div className="rounded-md border">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Assigned Routes</h3>
                </div>
                
                {routes?.length ? (
                  <div className="mt-4 space-y-2">
                    {routes.map((route) => (
                      <div
                        key={route.id}
                        className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
                      >
                        <div>
                          <p className="font-medium">
                            {route.origin} → {route.destination}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {route.distance}km • ${route.basePrice}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Assign
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No routes available
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
