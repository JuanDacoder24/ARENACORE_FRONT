import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Torneo } from '../../models/torneo';
import { TorneoService } from '../../service/torneo-service';

@Component({
  selector: 'app-card-torneo',
  imports: [],
  templateUrl: './card-torneo.html',
  styleUrl: './card-torneo.css',
})
export class CardTorneo {

  router = inject(Router)
  http = inject(HttpClient)
  torneoService = inject(TorneoService)

  @Input() torneo!: Torneo

  estaInscrito: boolean = false
  cargando: boolean = false
  usuarioLogueadoId = 1

  ngOnInit() {
  }

  // Determina si el usuario actual es el que creó este torneo
  get esOrganizador(): boolean {
    return Number(this.torneo.organizador_id) === this.usuarioLogueadoId;
  }

  // Determina si el torneo ya terminó
  get estaFinalizado(): boolean {
    return this.torneo.estado === 'finalizado';
  }

  async unirseAlTorneo(torneoId: number) {
    if (this.estaInscrito || this.cargando) return

    this.cargando = true
    const idUsuarioPrueba = 1

    try {
      await this.torneoService.inscribirUsuario(torneoId, idUsuarioPrueba)
      this.estaInscrito = true
      this.torneo.participantes_actuales!++
      alert('¡Inscripción exitosa!')
    } catch (error: any) {
      if (error.error?.message?.includes('Ya estás inscrito')) {
        this.estaInscrito = true
      }
      alert(error.error?.message || 'Error al intentar unirse')
    } finally {
      this.cargando = false
    }
  }


  esMiTorneo(): boolean {
    return this.torneo.organizador_id === this.usuarioLogueadoId
  }

  irAGestionar() {
  this.router.navigate(['/dashboard/torneo', this.torneo.id, 'admin']);
}
}