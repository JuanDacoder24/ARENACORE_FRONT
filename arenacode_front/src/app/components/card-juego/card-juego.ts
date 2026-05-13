import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IJuego } from '../../interfaces/ijuegos';

@Component({
  selector: 'app-card-juego',
  imports: [],
  templateUrl: './card-juego.html',
  styleUrl: './card-juego.css',
})
export class CardJuego {

  router = inject(Router);

  @Input() juego!: IJuego;
  @Input() nombreCategoria: string = '';

}