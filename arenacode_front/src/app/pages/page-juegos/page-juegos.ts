import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardJuegoComponent } from '../../components/card-juego/card-juego';

@Component({
  selector: 'app-page-juegos',
  standalone: true,
  imports: [CommonModule, CardJuegoComponent],
  templateUrl: './page-juegos.html',
  styleUrl: './page-juegos.css',
})
export class PageJuegos {
  juegos = [
    {
      id: 1,
      nombre: 'League of Legends',
      descripcion: 'El MOBA más popular del mundo. Defiende tu base invocador.',
      desarrollador: 'Riot Games',
      max_jugadores_equipo: 5,
      destacado: true
    },
    {
      id: 2,
      nombre: 'Valorant',
      descripcion: 'FPS táctico de Riot Games. Combina armas y habilidades de agentes.',
      desarrollador: 'Riot Games',
      max_jugadores_equipo: 5,
      destacado: true
    },
    {
      id: 3,
      nombre: 'Counter-Strike 2',
      descripcion: 'El shooter táctico definitivo con la nueva era de CS.',
      desarrollador: 'Valve',
      max_jugadores_equipo: 5,
      destacado: true
    },
    {
      id: 4,
      nombre: 'Fortnite',
      descripcion: 'Battle Royale de Epic Games. Construye y sobrevive para ser el último.',
      desarrollador: 'Epic Games',
      max_jugadores_equipo: 4,
      destacado: false
    },
    {
      id: 5,
      nombre: 'FIFA 24',
      descripcion: 'Simulador de fútbol profesional. Lleva a tu equipo a la gloria.',
      desarrollador: 'EA Sports',
      max_jugadores_equipo: 11,
      destacado: false
    }
  ];
}
