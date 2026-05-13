import { Component, inject, OnInit } from '@angular/core'
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
  torneo?: Torneo
  participantes: any[] = []
  cargando = true

  ngOnInit() {
    this.torneoId = Number(this.route.snapshot.paramMap.get('id'))
    this.cargarDatos()
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
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto! deseas asignar el premio a " + username + "?",
      icon: "warning",
      background: '#0d2a4a',
      color: 'white',
      showCancelButton: true,
      confirmButtonText: "Sí, asignar ganador!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) swalWithBootstrapButtons.fire({
        title: "Ganador Asignado!",
        background: '#0d2a4a',
        color: 'white',
        text: "El premio ha sido asignado a " + username + ".",
        icon: "success"
      });
      else if (result.dismiss === Swal.DismissReason.cancel) swalWithBootstrapButtons.fire({
        title: "Cancelado",
        background: '#0d2a4a',
        color: 'white',
        text: "No se asignó ningún ganador.",
        icon: "error"
      });
    });
  }
}