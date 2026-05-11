import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Torneo } from '../models/torneo';

@Injectable({
  providedIn: 'root',
})
export class TorneoService {

  private baseUrl: string = 'http://localhost:3000/api/torneos'
  private httpClient = inject(HttpClient)

  constructor() { }

  // obtener todos los torneos
  getTorneos(): Promise<Torneo[]> {
    return lastValueFrom(this.httpClient.get<Torneo[]>(this.baseUrl))
  }

  // obtener un torneo por id
  getTorneoById(id: number): Promise<Torneo> {
    return lastValueFrom(this.httpClient.get<Torneo>(`${this.baseUrl}/${id}`))
  }

  // crear uno nuevo
  crearTorneo(torneo: Torneo): Promise<Torneo> {
    return lastValueFrom(this.httpClient.post<Torneo>(this.baseUrl, torneo))
  }

  // actualizar
  actualizarTorneo(id: number, torneo: Torneo): Promise<Torneo> {
    return lastValueFrom(this.httpClient.put<Torneo>(`${this.baseUrl}/${id}`, torneo))
  }

  // borrar
  borrarTorneo(id: number): Promise<void> {
    return lastValueFrom(this.httpClient.delete<void>(`${this.baseUrl}/${id}`))
  }

  async inscribirUsuario(torneoId: number, usuarioId: number): Promise<any> {
    const url = `${this.baseUrl}/${torneoId}/inscribir`;
    return lastValueFrom(this.httpClient.post(url, { usuario_id: usuarioId }));
  }

  getTorneosPorUsuario(usuarioId: number): Promise<Torneo[]> {
    return lastValueFrom(this.httpClient.get<Torneo[]>(`http://localhost:3000/api/usuarios/${usuarioId}/torneos`))
  }

  async getParticipantes(torneoId: number): Promise<any[]> {
    const url = `${this.baseUrl}/${torneoId}/participantes`;
    return lastValueFrom(this.httpClient.get<any[]>(url));
  }

  async finalizarTorneo(torneoId: number, ganadorId: number): Promise<any> {
    const url = `${this.baseUrl}/${torneoId}/finalizar`;
    return lastValueFrom(this.httpClient.post(url, { ganador_id: ganadorId }));
  }
}