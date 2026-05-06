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
  
  router = inject(Router)  // público porque el HTML accede directo con router.navigate

  @Input() juego!: IJuego  // recibe los datos del juego desde el componente padre
  @Input() vista: 'grid' | 'list' = 'grid'  // propiedad para cambiar vista
}