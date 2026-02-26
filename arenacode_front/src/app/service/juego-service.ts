import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  deleteById(id: string) {
    throw new Error('Method not implemented.');
  }
  private httpClient = inject(HttpClient)
  private apiUrl = 'http://localhost:8080/api/juegos';

  //Obtener todos los juegos
    async getAllJuegos() {
    try {
      const response = await this.httpClient.get(this.apiUrl).toPromise();
      return response;
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      throw error;
    }
  }
  
  //Obtener un juego por su id
  async getJuegoById(id: number) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/${id}`).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al obtener el juego con id ${id}:`, error);
      throw error;
    }
  }
  //Crear un nuevo juego
  async createJuego(juego: any) {
    try {
      const response = await this.httpClient.post(this.apiUrl, juego).toPromise();
      return response;
    } catch (error) {
      console.error('Error al crear el juego:', error);
      throw error;
    }
  }
  //Actualizar un juego existente
  async updateJuego(id: number, juego: any) {
    try {
      const response = await this.httpClient.put(`${this.apiUrl}/${id}`, juego).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al actualizar el juego con id ${id}:`, error);
      throw error;
    }
  }
  //Eliminar un juego por su id
  async deleteJuego(id: number) {
    try {
      const response = await this.httpClient.delete(`${this.apiUrl}/${id}`).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al eliminar el juego con id ${id}:`, error);
      throw error;
    } 
  }


}
