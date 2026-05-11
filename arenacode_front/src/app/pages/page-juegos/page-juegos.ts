import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JuegoService } from '../../service/juego-service';
import { IJuego } from '../../interfaces/ijuegos';
import { ICategoria } from '../../interfaces/icategoria';
import { CardJuego } from '../../components/card-juego/card-juego';

@Component({
  selector: 'app-page-juegos',
  standalone: true,
  // En Angular 19, si usas @if y @for, CommonModule es opcional
  imports: [CardJuego, FormsModule],
  templateUrl: './page-juegos.html',
  styleUrl: './page-juegos.css',
})
export class PageJuegos implements OnInit {
  private readonly juegoService = inject(JuegoService);
  
  // Signals de estado privado
  private readonly _juegos = signal<IJuego[]>([]);
  
  // Signals públicos o accesibles
  readonly searchTerm = signal<string>('');
  readonly categoriaIdSeleccionada = signal<number | null>(null);
  readonly cargando = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  // Getter para acceder a juegos desde el HTML si fuera necesario (opcional)
  readonly juegos = computed(() => this._juegos());

  // Extraer categorías únicas de los juegos cargados
  readonly categorias = computed<ICategoria[]>(() => {
    const juegosActuales = this._juegos();
    const categoriasMap = new Map<number, ICategoria>();
    
    juegosActuales.forEach(juego => {
      if (juego.categoria_id) {
        categoriasMap.set(juego.categoria_id.id, juego.categoria_id);
      }
    });
    
    return Array.from(categoriasMap.values());
  });

  // Lógica de filtrado reactiva
  readonly juegosFiltrados = computed(() => {
    const termino = this.searchTerm().toLowerCase().trim();
    const categoriaId = this.categoriaIdSeleccionada();
    
    return this._juegos().filter(juego => {
      const cumpleCategoria = !categoriaId || juego.categoria_id?.id === categoriaId;
      
      const cumpleBusqueda = !termino || 
        juego.nombre.toLowerCase().includes(termino) ||
        juego.descripcion?.toLowerCase().includes(termino) ||
        juego.categoria_id?.nombre.toLowerCase().includes(termino);
      
      return cumpleCategoria && cumpleBusqueda;
    });
  });

  ngOnInit(): void {
    this.cargarJuegos();
  }

  async cargarJuegos() {
    this.cargando.set(true);
    this.error.set(null);
    
    try {
      const data = await this.juegoService.getAllJuegos();
      this._juegos.set(data);
    } catch (err) {
      this.error.set('Error al conectar con el servidor.');
    } finally {
      this.cargando.set(false);
    }
  }

  actualizarBusqueda(termino: string) {
    this.searchTerm.set(termino);
  }

  filtrarPorCategoria(value: string) {
    const id = value === 'null' ? null : Number(value);
    this.categoriaIdSeleccionada.set(id);
  }

  limpiarBusqueda() {
    this.searchTerm.set('');
    this.categoriaIdSeleccionada.set(null);
  }

  recargar() {
    this.cargarJuegos();
  }
}