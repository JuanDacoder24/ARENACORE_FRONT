import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TorneoService } from '../../service/torneo-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Torneo } from '../../models/torneo';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-torneo',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './form-torneo.html',
  styleUrl: './form-torneo.css',
})
export class FormTorneo {

  modelForm: FormGroup
  servicioTorneo = inject(TorneoService)
  activedRoute = inject(ActivatedRoute)
  router = inject(Router)

  isNew: boolean

  torneoId: string | null = null

  constructor() {
    this.isNew = true
    this.modelForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl(''),
      juego_id: new FormControl('', [Validators.required]),
      organizador_id: new FormControl('', [Validators.required]),
      tipo: new FormControl('publico', [Validators.required]),
      estado: new FormControl('abierto', [Validators.required]),
      max_participantes: new FormControl(0, [Validators.required]),
      participantes_actuales: new FormControl(0),
      precio_inscripcion: new FormControl(0),
      premio_total: new FormControl(0),
      fecha_inicio: new FormControl(new Date(), [Validators.required]),
      fecha_fin: new FormControl(new Date()),
      reglas: new FormControl(''),
      created_at: new FormControl(new Date()),
    });
  }

  async getDataForm() {
    console.log('form valido', this.modelForm.valid)
    console.log('valores', this.modelForm.value)

    let torneo = this.modelForm.value as Torneo

    if (this.isNew) {
      console.log('creando nuevo torneo')
      const res = await this.servicioTorneo.crearTorneo(torneo)
      console.log('respuesta', res)
      if (res.id) {
        await Swal.fire({
          title: 'Torneo creado',
          text: 'El torneo se ha creado correctamente',
          icon: 'success'
        });
      } else {
        await Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el torneo',
          icon: 'error'
        });
      }
    }
    this.router.navigate(['/torneos'])
    this.modelForm.reset()
  }

  async ngOnInit() {
    this.activedRoute.params.subscribe(async (params: any) => {
      let id: string = params.id
      if (id != undefined) {
        this.isNew = false
        this.torneoId = id
        try {
          const torneo = await this.servicioTorneo.getTorneoById(Number(id))
          if (torneo != undefined) {
            this.modelForm.patchValue({
              nombre: torneo.nombre,
              descripcion: torneo.descripcion,
              juego_id: torneo.juego_id,
              organizador_id: torneo.organizador_id,
              tipo: torneo.tipo,
              estado: torneo.estado,
              max_participantes: torneo.max_participantes,
              participantes_actuales: torneo.participantes_actuales,
              precio_inscripcion: torneo.precio_inscripcion,
            })
          } else {
            await Swal.fire({
              title: 'Error',
              text: 'No se pudo encontrar el torneo',
              icon: 'error'
            });
            this.router.navigate(['/torneos'])
          }
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo obtener el torneo',
            icon: 'error'
          });
        }
        this.router.navigate(['/torneos'])
      } else {
        this.isNew = true
        this.torneoId = null
      }
    });
  }
}

