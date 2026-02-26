import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Torneo } from '../models/torneo';    

@Injectable({
  providedIn: 'root',
})
export class TorneoService {

  private baseUrl : string = 'http://localhost:8080/api/torneos'
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
}