import { Component, inject, OnInit } from '@angular/core';
import { JuegoService } from '../../service/juego-service';
import { IJuego } from '../../interfaces/ijuegos';
import { CardJuego } from '../../components/card-juego/card-juego';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-juegos',
  imports: [CommonModule, CardJuego, FormsModule],
  templateUrl: './page-juegos.html',
  styleUrl: './page-juegos.css',
})
export class PageJuegos implements OnInit {
  private juegoService = inject(JuegoService);
  juegos: IJuego[] = [];
  juegosFiltrados: IJuego[] = [];
  cargando: boolean = true;
  searchTerm: string = '';
  vista: 'grid' | 'list' = 'grid';

  async ngOnInit() {
    await this.cargarJuegos();
  }

  async cargarJuegos() {
    try {
      this.juegos = await this.juegoService.getAllJuegos();
      this.juegosFiltrados = [...this.juegos];
    } catch (error) {
      console.error('Error al cargar juegos:', error);
    } finally {
      this.cargando = false;
    }
  }

  filtrarJuegos() {
    if (!this.searchTerm.trim()) {
      this.juegosFiltrados = [...this.juegos];
    } else {
      const termino = this.searchTerm.toLowerCase();
      this.juegosFiltrados = this.juegos.filter(juego =>
        juego.nombre.toLowerCase().includes(termino) ||
        (juego.descripcion && juego.descripcion.toLowerCase().includes(termino))
      );
    }
  }

  cambiarVista(tipo: 'grid' | 'list') {
    this.vista = tipo;
  }

  limpiarBusqueda() {
    this.searchTerm = '';
    this.juegosFiltrados = [...this.juegos];
  }
}