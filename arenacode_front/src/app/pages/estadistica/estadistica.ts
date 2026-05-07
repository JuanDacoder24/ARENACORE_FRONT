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
      await this.cargarEstadisticas();
    }
  }

 async cargarEstadisticas() {
  try {
    const response = await this.userService.getEstadisticas(this.usuario.id);
    this.estadisticas = response.data;  
  } catch (error) {
    console.error('Error al cargar estadísticas:', error);
  } finally {
    this.cargando = false;
  }
}
}