import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Torneo } from '../models/torneo';    // interfaz/DTO

@Injectable({
  providedIn: 'root',
})
export class TorneoService {

  private readonly baseUrl = '/api/torneos';   // la URL de tu API

  constructor(private http: HttpClient) { }

  // obtener todos los torneos
  getTorneos(): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(this.baseUrl);
  }

  // obtener un torneo por id
  getTorneo(id: number): Observable<Torneo> {
    return this.http.get<Torneo>(`${this.baseUrl}/${id}`);
  }

  // crear uno nuevo
  crearTorneo(t: Torneo): Observable<Torneo> {
    return this.http.post<Torneo>(this.baseUrl, t);
  }

  // actualizar
  actualizarTorneo(id: number, t: Torneo): Observable<Torneo> {
    return this.http.put<Torneo>(`${this.baseUrl}/${id}`, t);
  }

  // borrar
  borrarTorneo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}