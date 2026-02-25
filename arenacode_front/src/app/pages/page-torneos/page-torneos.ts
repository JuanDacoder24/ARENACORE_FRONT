import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTorneoComponent } from '../../components/card-torneo/card-torneo';

@Component({
  selector: 'app-page-torneos',
  standalone: true,
  imports: [CommonModule, CardTorneoComponent],
  templateUrl: './page-torneos.html',
  styleUrl: './page-torneos.css',
})
export class PageTorneos {
  torneos = [
    {
      id: 1,
      nombre: 'Copa League of Legends 2025',
      descripcion: 'Torneo profesional de LoL con premios increíbles',
      tipo: 'publico',
      estado: 'abierto',
      participantes_actuales: 18,
      max_participantes: 32,
      premio_total: 5000,
      fecha_inicio: '2025-03-15T18:00:00Z'
    },
    {
      id: 2,
      nombre: 'Valorant Masters Spring',
      descripcion: 'Competencia táctica de alto nivel',
      tipo: 'publico',
      estado: 'abierto',
      participantes_actuales: 12,
      max_participantes: 16,
      premio_total: 8000,
      fecha_inicio: '2025-03-20T19:00:00Z'
    },
    {
      id: 3,
      nombre: 'CS2 Global Championship',
      descripcion: 'El mejor torneo de Counter-Strike',
      tipo: 'privado',
      estado: 'en_progreso',
      participantes_actuales: 24,
      max_participantes: 24,
      premio_total: 12000,
      fecha_inicio: '2025-03-25T20:00:00Z'
    },
    {
      id: 4,
      nombre: 'FIFA 24 Weekend League',
      descripcion: 'Torneo de fin de semana con reglas estándar eSports.',
      tipo: 'publico',
      estado: 'finalizado',
      participantes_actuales: 64,
      max_participantes: 64,
      premio_total: 2500,
      fecha_inicio: '2025-02-09T14:00:00Z'
    }
  ];
}
