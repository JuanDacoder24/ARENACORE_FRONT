import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-juego',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-juego">
      <img [src]="juego?.imagen_url" [alt]="juego?.nombre" *ngIf="juego?.imagen_url">
      <h3>{{ juego?.nombre }}</h3>
      <p>{{ juego?.descripcion }}</p>
      <span>{{ juego?.desarrollador }}</span>
    </div>
  `
})
export class CardJuegoComponent {
  @Input() juego: any;
}