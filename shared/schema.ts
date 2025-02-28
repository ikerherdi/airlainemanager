import { pgTable, text, serial, integer, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const aircraft = pgTable("aircraft", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  capacity: integer("capacity").notNull(),
  range: integer("range").notNull(),
  fuelCapacity: integer("fuel_capacity").notNull(),
  status: text("status").notNull(),
});

export const routes = pgTable("routes", {
  id: serial("id").primaryKey(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  distance: integer("distance").notNull(),
  basePrice: real("base_price").notNull(),
  aircraftId: integer("aircraft_id").notNull(),
});

export const fuelPrices = pgTable("fuel_prices", {
  id: serial("id").primaryKey(),
  price: real("price").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const finances = pgTable("finances", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // income/expense
  category: text("category").notNull(),
  amount: real("amount").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const insertAircraftSchema = createInsertSchema(aircraft).omit({ id: true });
export const insertRouteSchema = createInsertSchema(routes).omit({ id: true });
export const insertFuelPriceSchema = createInsertSchema(fuelPrices).omit({ id: true });
export const insertFinanceSchema = createInsertSchema(finances).omit({ id: true });

export type Aircraft = typeof aircraft.$inferSelect;
export type Route = typeof routes.$inferSelect;
export type FuelPrice = typeof fuelPrices.$inferSelect;
export type Finance = typeof finances.$inferSelect;
export type InsertAircraft = z.infer<typeof insertAircraftSchema>;
export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type InsertFuelPrice = z.infer<typeof insertFuelPriceSchema>;
export type InsertFinance = z.infer<typeof insertFinanceSchema>;
