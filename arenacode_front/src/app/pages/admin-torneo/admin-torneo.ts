import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TorneoService } from '../../service/torneo-service';
import { Torneo } from '../../models/torneo';

@Component({
  selector: 'app-admin-torneo',
  imports: [],
  templateUrl: './admin-torneo.html',
  styleUrl: './admin-torneo.css',
})
export class AdminTorneo implements OnInit{

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private torneoService = inject(TorneoService);

  torneoId!: number;
  torneo?: Torneo;
  participantes: any[] = []; 
  cargando = true;

  ngOnInit() {
    this.torneoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      this.torneo = await this.torneoService.getTorneoById(this.torneoId);
      
      this.participantes = [
        { id: 1, username: 'NightHunter_89', nivel: 25 },
        { id: 2, username: 'ProPlayer_22', nivel: 18 },
        { id: 5, username: 'GamerGirl_x', nivel: 30 }
      ];
      
      this.cargando = false;
    } catch (error) {
      console.error('Error cargando gestión:', error);
      this.router.navigate(['/dashboard/pageTorneos']);
    }
  }

  async elegirGanador(usuarioId: number, username: string) {
    const confirmar = confirm(`¿Estás seguro de coronar a ${username} como ganador? Se le entregará el premio de ${this.torneo?.premio_total} monedas.`);
    
    if (confirmar) {
      try {
        console.log(`Finalizando torneo ${this.torneoId} con ganador ${usuarioId}`);
        alert('¡Torneo finalizado y premio entregado!');
        this.router.navigate(['/dashboard/pageTorneos']);
      } catch (error) {
        alert('Error al procesar el ganador');
      }
    }
  }
}