import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { TorneoService } from '../../service/torneo-service';
import { Torneo } from '../../models/torneo';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private torneoService = inject(TorneoService);

  torneosPublicos: Torneo[] = [];
  misInscripciones: Torneo[] = [];
  cargando = true;

  readonly usuarioId = 1;

  async ngOnInit() {
    try {
      const todos = await this.torneoService.getTorneos();

      this.torneosPublicos = todos.filter(t =>
        t.tipo === 'publico' && t.estado === 'abierto'
      );
      this.misInscripciones = todos.filter(t =>
        t.organizador_id === this.usuarioId
      );

    } catch (error) {
      console.error('Error cargando torneos:', error);
    } finally {
      this.cargando = false;
    }
  }
}