import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Torneo } from '../../models/torneo';
import { TorneoService } from '../../service/torneo-service';
import Swal from 'sweetalert2';

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
  usuarioLogueadoId = Number(localStorage.getItem('id')) || 0  
  async ngOnInit() {
  const usuarioId = Number(localStorage.getItem('id'))
  this.usuarioLogueadoId = usuarioId

  try {
    const participantes = await this.torneoService.getParticipantes(this.torneo.id)
    this.estaInscrito = participantes.some((p: any) => p.id === usuarioId)
  } catch {
    this.estaInscrito = false
  }
}

  get esOrganizador(): boolean {
    return Number(this.torneo.organizador_id) === this.usuarioLogueadoId;
  }

  get estaFinalizado(): boolean {
    return this.torneo.estado === 'finalizado';
  }

  async unirseAlTorneo(torneoId: number) {
    if (this.estaInscrito || this.cargando) return

    this.cargando = true
    const usuarioId = Number(localStorage.getItem('id')) 

    try {
      await this.torneoService.inscribirUsuario(torneoId, usuarioId)
      this.estaInscrito = true
      this.torneo.participantes_actuales!++
      Swal.fire({
        icon: 'success',
        title: '¡Inscripción exitosa!',
        background: '#0d2a4a',
        color: 'white',
        confirmButtonColor: '#27ae60',
        text: 'Te has unido al torneo exitosamente.'
      })

    } catch (error: any) {
      if (error.error?.message?.includes('Ya estás inscrito')) {
        this.estaInscrito = true
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          background: '#0d2a4a',
          color: 'white',
          confirmButtonColor: '#e74c3c',
          text: error.error?.message || 'No se pudo unir al torneo.'
        })
      }
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