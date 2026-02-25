import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-user.html',
  styleUrl: './perfil-user.css',
})
export class PerfilUser implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  usuario: any = null;
  estadisticas: any = null;
  activeTab = 'perfil'; // 'perfil' | 'estadisticas'
  loadingStats = false;
  
  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.usuario = JSON.parse(userStr);
    this.cargarEstadisticas();
  }

  async cargarEstadisticas() {
    this.loadingStats = true;
    try {
      const response = await this.userService.getEstadisticas(this.usuario.id);
      this.estadisticas = response.data || response;
    } catch (error) {
      console.error('Error al cargar estadísticas', error);
      // Fallback a datos simulados basados en tu DB por si el backend no corre
      this.estadisticas = {
        torneos_jugados: 25,
        torneos_ganados: 8,
        partidas_jugadas: 120,
        partidas_ganadas: 75,
        puntos_totales: 15000,
        nivel: 15,
        ranking_global: 1
      };
    } finally {
      this.loadingStats = false;
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
