import { Component, inject, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TorneoService } from '../../service/torneo-service'
import { Torneo } from '../../models/torneo'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-torneo',
  imports: [],
  templateUrl: './admin-torneo.html',
  styleUrl: './admin-torneo.css',
})
export class AdminTorneo implements OnInit {

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private torneoService = inject(TorneoService)

  torneoId!: number
  @Input() torneo!: Torneo
  participantes: any[] = []
  cargando = true

  ngOnInit() {
    this.torneoId = Number(this.route.snapshot.paramMap.get('id'))
    this.cargarDatos()
  }

  get estaFinalizado(): boolean {
    return this.torneo.estado === 'finalizado';
  }

  async cargarDatos() {
    try {
      this.torneo = await this.torneoService.getTorneoById(this.torneoId)
      this.participantes = await this.torneoService.getParticipantes(this.torneoId)

      this.cargando = false
    } catch (error) {
      console.error('Error cargando gestión:', error)
      this.router.navigate(['/dashboard/pageTorneos'])
    }
  }

  async elegirGanador(usuarioId: number, username: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto! deseas asignar el premio a " + username + "?",
      icon: "warning",
      background: '#0d2a4a',
      color: 'white',
      showCancelButton: true,
      confirmButtonText: "Sí, asignar ganador!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        swalWithBootstrapButtons.fire({
          title: "Procesando...",
          text: "Asignando ganador y finalizando torneo",
          icon: "info",
          background: '#0d2a4a',
          color: 'white',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        })

        await this.torneoService.finalizarTorneo(this.torneoId, usuarioId)

        this.torneo.estado = 'finalizado'

        await swalWithBootstrapButtons.fire({
          title: "Ganador Asignado!",
          background: '#0d2a4a',
          color: 'white',
          text: `El premio de ${this.torneo.premio_total} monedas ha sido asignado a ${username}. El torneo ha sido finalizado.`,
          icon: "success"
        })

        this.router.navigate(['/dashboard/pageTorneos'])

      } catch (error) {
        console.error('Error al finalizar torneo:', error)
        swalWithBootstrapButtons.fire({
          title: "Error",
          background: '#0d2a4a',
          color: 'white',
          text: "Hubo un error al asignar el ganador. Por favor intenta de nuevo.",
          icon: "error"
        })
      }

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelado",
        background: '#0d2a4a',
        color: 'white',
        text: "No se asignó ningún ganador.",
        icon: "error"
      })
    }
  }
}