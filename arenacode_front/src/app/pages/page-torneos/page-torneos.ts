import { Component, inject, OnInit } from '@angular/core';
import { TorneoService } from '../../service/torneo-service';
import { Torneo } from '../../models/torneo';  // ← usa el modelo, no la interfaz
import { CardTorneo } from '../../components/card-torneo/card-torneo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-torneos',
  imports: [CommonModule, CardTorneo],
  templateUrl: './page-torneos.html',
  styleUrl: './page-torneos.css',
})
export class PageTorneos implements OnInit {
  private torneoService = inject(TorneoService);
  torneos: Torneo[] = [];  // ← Torneo[] en vez de Itorneos[]
  cargando: boolean = true;

  async ngOnInit() {
    await this.cargarTorneos();
  }

  async cargarTorneos() {
    try {
      this.torneos = await this.torneoService.getTorneos();  // ← getTorneos() no getAllTorneos()
    } catch (error) {
      console.error('Error al cargar torneos:', error);
    } finally {
      this.cargando = false;
    }
  }
}