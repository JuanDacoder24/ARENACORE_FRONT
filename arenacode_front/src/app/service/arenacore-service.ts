import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArenacoreService {
  
  private baseUrl: string = 'http://localhost:8080/arenacore'
  private httpClient = inject(HttpClient)

  constructor() { }

  //traer todos los juegos 

  //traer un juego por id

  //añadir un juego

  //editar un juego

  //eliminar un juego

  //insertar un juego 

  //verificacion que se ah insertado el juego

  

}
