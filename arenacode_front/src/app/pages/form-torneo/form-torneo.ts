import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TorneoService } from '../../service/torneo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Torneo } from '../../models/torneo';

@Component({
  selector: 'app-form-torneo',
  imports: [],
  templateUrl: './form-torneo.html',
  styleUrl: './form-torneo.css',
})
export class FormTorneo {

  modelForm: FormGroup
  servicioTorneo = inject(TorneoService)
  activedRoute = inject(ActivatedRoute)
  router = inject(Router)

  isNew: boolean

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

    if(this.isNew) {
      console.log('creando nuevo torneo')
      const res = await this.servicioTorneo.crearTorneo(torneo)
      console.log('respuesta', res)
    }
  }
}  
