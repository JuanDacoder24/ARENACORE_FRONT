import { Component, inject, OnInit } from '@angular/core';
import { JuegoService } from '../../service/juego-service';
import { IJuego } from '../../interfaces/ijuegos';
import { CardJuego } from '../../components/card-juego/card-juego';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-juegos',
  imports: [CommonModule, CardJuego],
  templateUrl: './page-juegos.html',
  styleUrl: './page-juegos.css',
})
export class PageJuegos implements OnInit {
  private juegoService = inject(JuegoService);
  juegos: IJuego[] = [];
  cargando: boolean = true;

  async ngOnInit() {
    await this.cargarJuegos();
  }

  async cargarJuegos() {
    try {
      this.juegos = await this.juegoService.getAllJuegos();
    } catch (error) {
      console.error('Error al cargar juegos:', error);
    } finally {
      this.cargando = false;
    }
  }
}