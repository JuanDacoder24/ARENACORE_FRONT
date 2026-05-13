import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JuegoService } from '../../service/juego-service';
import { IJuego } from '../../interfaces/ijuegos';
import { ICategoria } from '../../interfaces/icategoria';
import { CardJuego } from '../../components/card-juego/card-juego';

@Component({
  selector: 'app-page-juegos',
  standalone: true,
  imports: [CardJuego, FormsModule],
  templateUrl: './page-juegos.html',
  styleUrl: './page-juegos.css',
})
export class PageJuegos implements OnInit {

  private readonly juegoService = inject(JuegoService);

  private readonly _juegos = signal<IJuego[]>([]);

  // Signals públicos o accesibles
  readonly searchTerm = signal<string>('');
  readonly categoriaIdSeleccionada = signal<number | null>(null);
  readonly cargando = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly juegos = computed(() => this._juegos());

  private readonly _categoriasDeServicio = signal<ICategoria[]>([]);
  readonly categorias = computed(() => this._categoriasDeServicio());

  async cargarDatos() {
    this.cargando.set(true);
    try {
      const [juegos, cats] = await Promise.all([
        this.juegoService.getAllJuegos(),
        this.juegoService.getAllCategorias()
      ]);
      this._juegos.set(juegos);
      this._categoriasDeServicio.set(cats);
    } catch (err) {
      this.error.set('Error al conectar con el servidor.');
    } finally {
      this.cargando.set(false);
    }
  }

  readonly juegosFiltrados = computed(() => {
    const termino = this.searchTerm().toLowerCase().trim();
    const categoriaId = this.categoriaIdSeleccionada();

    return this._juegos().filter(juego => {
      const cumpleCategoria = !categoriaId || juego.categoria_id === categoriaId;
      const nombreCat = this.getNombreCategoria(juego.categoria_id).toLowerCase();

      const cumpleBusqueda = !termino ||
        juego.nombre.toLowerCase().includes(termino) ||
        juego.descripcion?.toLowerCase().includes(termino) ||
        nombreCat.includes(termino);

      return cumpleCategoria && cumpleBusqueda;
    });
  });

  getNombreCategoria(id: number | ICategoria): string {
    const idBusqueda = typeof id === 'object' ? id.id : Number(id);
    const cat = this._categoriasDeServicio().find(c => c.id === idBusqueda);
    return cat ? cat.nombre : '';
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  async cargarJuegos() {
    this.cargando.set(true);
    try {
      const data = await this.juegoService.getAllJuegos();
      console.log('DATOS DEL BACKEND:', data);
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

  filtrarPorCategoria(value: any) {
    this.categoriaIdSeleccionada.set(value ? Number(value) : null);
  }

  limpiarBusqueda() {
    this.searchTerm.set('');
    this.categoriaIdSeleccionada.set(null);
  }

  recargar() {
    this.cargarJuegos();
  }
}