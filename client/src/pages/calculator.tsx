import { useState } from "react";
import { useForm } from "react-hook-form";
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

interface CalculatorForm {
  distance: number;
  demand: number;
  competition: number;
}

export default function Calculator() {
  const [result, setResult] = useState<number | null>(null);
  
  const form = useForm<CalculatorForm>({
    defaultValues: {
      distance: 0,
      demand: 80,
      competition: 2,
    },
  });

  function onSubmit(data: CalculatorForm) {
    // Basic formula: (distance * 0.1) * (demand/100) * (3/competition)
    const price = (data.distance * 0.1) * (data.demand/100) * (3/data.competition);
    setResult(Math.round(price * 100) / 100);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ticket Price Calculator</h1>
        <p className="mt-2 text-sm text-gray-700">
          Calculate optimal ticket prices based on route characteristics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Route Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (km)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="demand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Demand (%)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="100" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="competition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Competition Level</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Calculate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Price</CardTitle>
          </CardHeader>
          <CardContent>
            {result !== null && (
              <div className="text-center">
                <p className="text-4xl font-bold text-[#003366]">
                  ${result}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  per passenger
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
