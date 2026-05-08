import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { JuegoService } from '../../service/juego-service';
import { IJuego } from '../../interfaces/ijuegos';
import { ICategoria } from '../../interfaces/icategoria';
import { CardJuego } from '../../components/card-juego/card-juego';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-juegos',
  standalone: true,
  imports: [CommonModule, CardJuego, FormsModule],
  templateUrl: './page-juegos.html',
  styleUrl: './page-juegos.css',
})
export class PageJuegos implements OnInit {
  private juegoService = inject(JuegoService);
  
  // Signals - TODOS deben llamarse como funciones en el HTML
  private juegos = signal<IJuego[]>([]);
  private searchTerm = signal<string>('');
  private categoriaIdSeleccionada = signal<number | null>(null);
  
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);
  
  categorias = computed<ICategoria[]>(() => {
    const categoriasMap = new Map<number, ICategoria>();
    this.juegos().forEach(juego => {
      if (juego.categoria_id && !categoriasMap.has(juego.categoria_id.id)) {
        categoriasMap.set(juego.categoria_id.id, juego.categoria_id);
      }
    });
    return Array.from(categoriasMap.values());
  });
  
  juegosFiltrados = computed(() => {
    const termino = this.searchTerm().toLowerCase().trim();
    const categoriaId = this.categoriaIdSeleccionada();
    const todosJuegos = this.juegos();
    
    return todosJuegos.filter(juego => {
      const matchesSearch = !termino || 
        juego.nombre.toLowerCase().includes(termino) ||
        (juego.descripcion && juego.descripcion.toLowerCase().includes(termino)) ||
        (juego.categoria_id?.nombre && juego.categoria_id.nombre.toLowerCase().includes(termino));
      
      const matchesCategoria = !categoriaId || 
        (juego.categoria_id && juego.categoria_id.id === categoriaId);
      
      return matchesSearch && matchesCategoria;
    });
  });
  
  stats = computed(() => ({
    total: this.juegos().length,
    mostrados: this.juegosFiltrados().length,
    categorias: this.categorias().length
  }));
  
  ngOnInit() {
    this.cargarJuegos();
  }
  
  async cargarJuegos() {
    this.cargando.set(true);
    this.error.set(null);
    
    try {
      const juegos = await this.juegoService.getAllJuegos();
      this.juegos.set(juegos);
    } catch (err) {
      console.error('Error al cargar juegos:', err);
      this.error.set('No se pudieron cargar los juegos. Por favor, intenta más tarde.');
    } finally {
      this.cargando.set(false);
    }
  }
  
  actualizarBusqueda(termino: string) {
    this.searchTerm.set(termino);
  }
  
  filtrarPorCategoria(categoriaId: number | null) {
    this.categoriaIdSeleccionada.set(categoriaId === null ? null : Number(categoriaId));
  }
  
  limpiarBusqueda() {
    this.searchTerm.set('');
    this.categoriaIdSeleccionada.set(null);
  }
  
  recargar() {
    this.cargarJuegos();
    this.limpiarBusqueda();
  }
}