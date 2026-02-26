export interface Torneo {
  id: number;
  nombre: string;
  descripcion?: string;
  juego_id: number;
  organizador_id: number;
  tipo?: 'publico' | 'privado';
  estado?: 'abierto' | 'en_progreso' | 'finalizado' | 'cancelado';
  max_participantes: number;
  participantes_actuales?: number;
  precio_inscripcion?: number;
  premio_total?: number;
  fecha_inicio: Date;
  fecha_fin?: Date;
  reglas?: string;
  created_at?: Date;
}