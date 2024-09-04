interface Common {
  id: number;
  name: string;
}

export interface Machine extends Common {
  locationId: number;
  modelNumber: string;
  status: "online" | "offline" | "maintenance";
  installationDate: Date;
  lastMaintenanceDate: Date;
  maintenanceIntervalDays: number;
  loadCapacity: number;
  usageCount: number;
  isUnderWarranty: boolean;
}

export interface Location extends Common {}
