import { Component, inject, OnInit } from '@angular/core';
import { TorneoService } from '../../service/torneo-service';
import { Torneo } from '../../models/torneo';  
import { CardTorneo } from '../../components/card-torneo/card-torneo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-torneos',
  imports: [CommonModule, CardTorneo, FormsModule, RouterLink],
  templateUrl: './page-torneos.html',
  styleUrl: './page-torneos.css',
})
export class PageTorneos implements OnInit {
  private torneoService = inject(TorneoService);
  torneos: Torneo[] = []; 
  torneosFiltrados: Torneo[] = [];
  cargando: boolean = true;
  searchTerm: string = '';
  filtroActivo: string = 'todos';
  contadores = { todos: 0, activos: 0, progreso: 0, finalizados: 0 };

  async ngOnInit() {
    await this.cargarTorneos();
  }

  async cargarTorneos() {
    try {
      this.torneos = await this.torneoService.getTorneos();  // ← getTorneos() no getAllTorneos()
      this.actualizarFiltros();
    } catch (error) {
      console.error('Error al cargar torneos:', error);
    } finally {
      this.cargando = false;
    }
  }

  filtrarTorneos() {
    this.actualizarFiltros();
  }

  cambiarFiltro(tipo: string) {
    this.filtroActivo = tipo;
    this.actualizarFiltros();
  }

  limpiarFiltros() {
    this.searchTerm = '';
    this.filtroActivo = 'todos';
    this.actualizarFiltros();
  }

  private actualizarFiltros() {
    // Calcular contadores
    const activos = this.torneos.filter(t => t.estado === 'abierto').length;
    const enProgreso = this.torneos.filter(t => t.estado === 'en_progreso').length;
    const finalizados = this.torneos.filter(t => t.estado === 'finalizado').length;
    
    this.contadores = {
      todos: this.torneos.length,
      activos,
      progreso: enProgreso,
      finalizados
    };

    // Aplicar filtro
    let resultado = [...this.torneos];

    if (this.filtroActivo === 'activos') {
      resultado = resultado.filter(t => t.estado === 'abierto');
    } else if (this.filtroActivo === 'progreso') {
      resultado = resultado.filter(t => t.estado === 'en_progreso');
    } else if (this.filtroActivo === 'finalizados') {
      resultado = resultado.filter(t => t.estado === 'finalizado');
    }

    // Aplicar búsqueda
    if (this.searchTerm.trim()) {
      const termino = this.searchTerm.toLowerCase();
      resultado = resultado.filter(torneo =>
        torneo.nombre.toLowerCase().includes(termino) ||
        (torneo.descripcion && torneo.descripcion.toLowerCase().includes(termino))
      );
    }

    this.torneosFiltrados = resultado;
  }
}