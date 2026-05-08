import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadistica',
  imports: [CommonModule],
  templateUrl: './estadistica.html',
  styleUrl: './estadistica.css',
})
export class PageEstadisticas implements OnInit {
  
  private userService = inject(UserService);

  usuario: any = null;
  estadisticas: any = null;
  cargando: boolean = true;

  async ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.usuario = JSON.parse(userStr);
    } else {
      this.usuario = {
        id: Number(localStorage.getItem('id')) || 0,
        nombre: localStorage.getItem('nombre') || '',
        email: localStorage.getItem('email') || ''
      };
    }
    if (this.usuario.id) {
      await this.cargarEstadisticas();
    } else {
      this.cargando = false;
    }
  }

  async cargarEstadisticas() {
    try {
      const response = await this.userService.getEstadisticas(this.usuario.id);
      this.estadisticas = response.data || response; // Soporta ambas formas
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      this.estadisticas = null;
    } finally {
      this.cargando = false;
    }
  }
}