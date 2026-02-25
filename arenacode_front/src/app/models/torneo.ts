export interface Torneo {
  id: number;
  nombre: string;
  fechaInicio: string; // ISO date
  fechaFin?: string;
  // añade otros campos que necesites
}