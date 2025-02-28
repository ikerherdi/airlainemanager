import { 
  Aircraft, InsertAircraft, 
  Route, InsertRoute,
  FuelPrice, InsertFuelPrice,
  Finance, InsertFinance
} from "@shared/schema";

export interface IStorage {
  // Aircraft
  getAircraft(id: number): Promise<Aircraft | undefined>;
  listAircraft(): Promise<Aircraft[]>;
  createAircraft(aircraft: InsertAircraft): Promise<Aircraft>;
  
  // Routes
  getRoute(id: number): Promise<Route | undefined>;
  listRoutes(): Promise<Route[]>;
  createRoute(route: InsertRoute): Promise<Route>;
  
  // Fuel Prices
  getFuelPrices(days: number): Promise<FuelPrice[]>;
  addFuelPrice(price: InsertFuelPrice): Promise<FuelPrice>;
  
  // Finances
  getFinances(days: number): Promise<Finance[]>;
  addFinance(finance: InsertFinance): Promise<Finance>;
}

export class MemStorage implements IStorage {
  private aircraft: Map<number, Aircraft>;
  private routes: Map<number, Route>;
  private fuelPrices: FuelPrice[];
  private finances: Finance[];
  private currentIds: { [key: string]: number };

  constructor() {
    this.aircraft = new Map();
    this.routes = new Map();
    this.fuelPrices = [];
    this.finances = [];
    this.currentIds = {
      aircraft: 1,
      routes: 1,
      fuelPrices: 1,
      finances: 1
    };

    // Add some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleAircraft: InsertAircraft[] = [
      {
        name: "Boeing 737-800",
        type: "Narrow-body",
        capacity: 189,
        range: 5765,
        fuelCapacity: 26020,
        status: "active"
      },
      {
        name: "Airbus A320neo",
        type: "Narrow-body",
        capacity: 180,
        range: 6300,
        fuelCapacity: 24210,
        status: "active"
      }
    ];

    sampleAircraft.forEach(aircraft => this.createAircraft(aircraft));

    // Add sample fuel prices for last 5 days
    const now = new Date();
    for (let i = 4; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      this.addFuelPrice({
        price: 2.5 + Math.random() * 0.5,
        timestamp: date
      });
    }
  }

  async getAircraft(id: number): Promise<Aircraft | undefined> {
    return this.aircraft.get(id);
  }

  async listAircraft(): Promise<Aircraft[]> {
    return Array.from(this.aircraft.values());
  }

  async createAircraft(aircraft: InsertAircraft): Promise<Aircraft> {
    const id = this.currentIds.aircraft++;
    const newAircraft = { ...aircraft, id };
    this.aircraft.set(id, newAircraft);
    return newAircraft;
  }

  async getRoute(id: number): Promise<Route | undefined> {
    return this.routes.get(id);
  }

  async listRoutes(): Promise<Route[]> {
    return Array.from(this.routes.values());
  }

  async createRoute(route: InsertRoute): Promise<Route> {
    const id = this.currentIds.routes++;
    const newRoute = { ...route, id };
    this.routes.set(id, newRoute);
    return newRoute;
  }

  async getFuelPrices(days: number): Promise<FuelPrice[]> {
    const now = new Date();
    const cutoff = new Date(now.setDate(now.getDate() - days));
    return this.fuelPrices.filter(fp => fp.timestamp >= cutoff);
  }

  async addFuelPrice(price: InsertFuelPrice): Promise<FuelPrice> {
    const id = this.currentIds.fuelPrices++;
    const newPrice = { ...price, id };
    this.fuelPrices.push(newPrice);
    return newPrice;
  }

  async getFinances(days: number): Promise<Finance[]> {
    const now = new Date();
    const cutoff = new Date(now.setDate(now.getDate() - days));
    return this.finances.filter(f => f.timestamp >= cutoff);
  }

  async addFinance(finance: InsertFinance): Promise<Finance> {
    const id = this.currentIds.finances++;
    const newFinance = { ...finance, id };
    this.finances.push(newFinance);
    return newFinance;
  }
}

export const storage = new MemStorage();
