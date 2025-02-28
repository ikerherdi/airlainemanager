import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertFuelPriceSchema } from "@shared/schema";
import type { InsertFuelPrice } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FuelPriceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertFuelPrice>({
    resolver: zodResolver(insertFuelPriceSchema),
    defaultValues: {
      price: 0,
      timestamp: new Date().toISOString(),
    },
  });

  async function onSubmit(data: InsertFuelPrice) {
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/fuel-prices", data);
      await queryClient.invalidateQueries({ queryKey: ["/api/fuel-prices"] });
      
      toast({
        title: "Success",
        description: "Fuel price has been updated",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update fuel price",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Fuel Price</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Gallon ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="2.50"
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Price"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
