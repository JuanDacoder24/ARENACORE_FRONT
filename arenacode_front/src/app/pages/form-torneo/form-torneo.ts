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
      organizador_id: new FormControl({ value: '', disabled: true }, [Validators.required]),
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

  async ngOnInit() {
    const usuarioIdStr = localStorage.getItem('id'); 
    if (usuarioIdStr) {
      this.modelForm.get('organizador_id')?.setValue(Number(usuarioIdStr));
    }

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
              organizador_id: torneo.organizador_id, // Si edita, mantiene el ID original del creador
              tipo: torneo.tipo,
              estado: torneo.estado,
              max_participantes: torneo.max_participantes,
              participantes_actuales: torneo.participantes_actuales,
              precio_inscripcion: torneo.precio_inscripcion,
              premio_total: torneo.premio_total,
              reglas: torneo.reglas,
              fecha_inicio: torneo.fecha_inicio,
              fecha_fin: torneo.fecha_fin
            })
          } else {
            this.mostrarError('No se pudo encontrar el torneo');
            this.router.navigate(['/dashboard/pageTorneos'])
          }
        } catch (error) {
          this.mostrarError('No se pudo obtener el torneo');
          this.router.navigate(['/dashboard/pageTorneos'])
        }
      } else {
        this.isNew = true
        this.torneoId = null
      }
    });
  }

  async enviarFormulario() {
    const valores = this.modelForm.getRawValue();

    const payload: any = {
      ...valores,
      juego_id: Number(valores.juego_id),
      organizador_id: Number(valores.organizador_id),
      max_participantes: Number(valores.max_participantes),
      precio_inscripcion: Number(valores.precio_inscripcion) || 0,
      premio_total: Number(valores.premio_total) || 0,
      fecha_inicio: new Date(valores.fecha_inicio).toISOString(),
      fecha_fin: valores.fecha_fin ? new Date(valores.fecha_fin).toISOString() : null
    };

    try {
      if (this.isNew) {
        console.log('creando nuevo torneo', payload)
        const res = await this.servicioTorneo.crearTorneo(payload);
        if (res && res.id) {
          await this.mostrarExito('Torneo creado correctamente');
        } else {
          await this.mostrarError('No se pudo crear el torneo');
        }
      } else {
        console.log('actualizando torneo', payload)
        await this.mostrarExito('Torneo actualizado correctamente');
      }
      
      this.router.navigate(['/dashboard/pageTorneos'])
      this.modelForm.reset()
    } catch (err: any) {
      console.error('Error en el proceso del torneo:', err);
      this.mostrarError('Hubo un problema al procesar la solicitud');
    }
  }

  // Helpers de alertas
  async mostrarExito(mensaje: string) {
    await Swal.fire({
      title: '¡Operación con éxito!',
      text: mensaje,
      background: '#0d2a4a',
      color: 'white',
      confirmButtonColor: '#66c0f4',
      icon: 'success'
    });
  }

  async mostrarError(mensaje: string) {
    await Swal.fire({
      title: 'Error',
      text: mensaje,
      background: '#0d2a4a',
      color: 'white',
      confirmButtonColor: '#66c0f4',
      icon: 'error'
    });
  }
}