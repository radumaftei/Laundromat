import express, { Request, Response } from "express";
import { Machine } from "./model";
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const washingMachines: Machine[] = [
  {
    id: 1,
    name: "Machine A",
    locationId: 2,
    modelNumber: "PDW909",
    status: "online",
    installationDate: new Date("2022-01-15"),
    lastMaintenanceDate: new Date("2024-07-30"),
    maintenanceIntervalDays: 180,
    loadCapacity: 500,
    usageCount: 1200,
    isUnderWarranty: true,
  },
  {
    id: 2,
    name: "Machine B",
    locationId: 102,
    modelNumber: "PWM509",
    status: "maintenance",
    installationDate: new Date("2021-06-20"),
    lastMaintenanceDate: new Date("2024-08-10"),
    maintenanceIntervalDays: 365,
    loadCapacity: 750,
    usageCount: 800,
    isUnderWarranty: false,
  },
  {
    id: 3,
    name: "Machine C",
    locationId: 3,
    modelNumber: "PWM514",
    status: "offline",
    installationDate: new Date("2020-11-05"),
    lastMaintenanceDate: new Date("2023-11-05"),
    maintenanceIntervalDays: 365,
    loadCapacity: 600,
    usageCount: 1500,
    isUnderWarranty: true,
  },
  {
    id: 4,
    name: "Machine D",
    locationId: 1,
    modelNumber: "PWM506",
    status: "online",
    installationDate: new Date("2023-03-10"),
    lastMaintenanceDate: new Date("2024-03-10"),
    maintenanceIntervalDays: 180,
    loadCapacity: 400,
    usageCount: 250,
    isUnderWarranty: true,
  },
  {
    id: 5,
    name: "Machine E",
    locationId: 1,
    modelNumber: "PWM508",
    status: "online",
    installationDate: new Date("2022-09-25"),
    lastMaintenanceDate: new Date("2024-05-30"),
    maintenanceIntervalDays: 180,
    loadCapacity: 650,
    usageCount: 950,
    isUnderWarranty: false,
  },
  {
    id: 6,
    name: "Machine F",
    locationId: 1,
    modelNumber: "PWM906",
    status: "maintenance",
    installationDate: new Date("2021-12-15"),
    lastMaintenanceDate: new Date("2024-08-25"),
    maintenanceIntervalDays: 365,
    loadCapacity: 700,
    usageCount: 600,
    isUnderWarranty: true,
  },
  {
    id: 7,
    name: "Machine G",
    locationId: 1,
    modelNumber: "PWM907",
    status: "offline",
    installationDate: new Date("2020-04-10"),
    lastMaintenanceDate: new Date("2023-12-10"),
    maintenanceIntervalDays: 365,
    loadCapacity: 800,
    usageCount: 1300,
    isUnderWarranty: false,
  },
];

const locations = [
  { id: 1, name: "Amsterdam" },
  { id: 2, name: "London" },
  { id: 3, name: "Berlin" },
];

app.get("/api/machines", (_: Request, res: Response) => {
  res.json(washingMachines);
});

app.get("/api/locations", (_: Request, res: Response) => {
  res.json(locations);
});

app.get("/api/machinesPerLocation", (_: Request, res: Response) => {
  res.json(
    locations.reduce((acc, location) => {
      return {
        ...acc,
        [location.id]: washingMachines.filter(
          (machine) => machine.locationId === location.id
        ),
      };
    }, {})
  );
});

app.get("/api/machines/:id", (req: Request, res: Response) => {
  const machineId = parseInt(req.params.id, 10);
  const machine = washingMachines.find((u) => u.id === machineId);

  if (machine) {
    res.json(machine);
  } else {
    res.status(404).json({ message: "Machine not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
