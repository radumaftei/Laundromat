import express, { Request, Response } from "express";
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

const washingMachines = [
  { id: 1, name: "PDW909", locationId: 2 },
  { id: 2, name: "PWM509", locationId: 2 },
  { id: 3, name: "PWM511", locationId: 1 },
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
