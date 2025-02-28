import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  // Aircraft routes
  app.get("/api/aircraft", async (_req, res) => {
    const aircraft = await storage.listAircraft();
    res.json(aircraft);
  });

  app.get("/api/aircraft/:id", async (req, res) => {
    const aircraft = await storage.getAircraft(parseInt(req.params.id));
    if (!aircraft) {
      res.status(404).json({ message: "Aircraft not found" });
      return;
    }
    res.json(aircraft);
  });

  // Routes
  app.get("/api/routes", async (_req, res) => {
    const routes = await storage.listRoutes();
    res.json(routes);
  });

  // Fuel prices
  app.get("/api/fuel-prices", async (req, res) => {
    const days = parseInt(req.query.days as string) || 5;
    const prices = await storage.getFuelPrices(days);
    res.json(prices);
  });

  // Finances
  app.get("/api/finances", async (req, res) => {
    const days = parseInt(req.query.days as string) || 30;
    const finances = await storage.getFinances(days);
    res.json(finances);
  });

  return createServer(app);
}
