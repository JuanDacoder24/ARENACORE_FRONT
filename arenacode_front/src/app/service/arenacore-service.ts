import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArenacoreService {
  
  private httpClient = inject(HttpClient)
  private baseUrl: string = 'http://localhost:8080/arenacore'
  
  constructor() { }

  //traer todos los juegos 
  async getAllGames(): Promise<any> {
    try {
      const response = await this.httpClient.get(`${this.baseUrl}/games`)
      return response;
    } catch (error) {
      console.error('Error al obtener los juegos:', error);
      throw error;
    }
  }
  //traer un juego por id
  async getGameById(gameId: number): Promise<any> {
    try {
      const response = await this.httpClient.get(`${this.baseUrl}/games/${gameId}`).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al obtener el juego con ID ${gameId}:`, error);
      throw error;
    }
  }
  //añadir un juego
  async addGame(gameData: any): Promise<any> {
    try {
      const response = await this.httpClient.post(`${this.baseUrl}/games`, gameData).toPromise();
      return response;
    } catch (error) {
      console.error('Error al añadir el juego:', error);
      throw error;
    }
  }
  //editar un juego
  async updateGame(gameId: number, gameData: any): Promise<any> {
    try {
      const response = await this.httpClient.put(`${this.baseUrl}/games/${gameId}`, gameData).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al actualizar el juego con ID ${gameId}:`, error);
      throw error;
    }
  }
  //eliminar un juego
  async deleteGame(gameId: number): Promise<any> {
    try {
      const response = await this.httpClient.delete(`${this.baseUrl}/games/${gameId}`).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al eliminar el juego con ID ${gameId}:`, error);
      throw error;
    }
  }
  //insertar un juego 
  async insertGame(gameData: any): Promise<any> {
    try {
      const response = await this.httpClient.post(`${this.baseUrl}/games`, gameData).toPromise();
      return response;
    } catch (error) {
      console.error('Error al insertar el juego:', error);
      throw error;
    }
  }
  //verificacion que se ah insertado el juego
  async verifyGameInsertion(gameId: number): Promise<boolean> {
    try {
      const response = await this.httpClient.get(`${this.baseUrl}/games/${gameId}`).toPromise();
      return response ? true : false;
    } catch (error) {
      console.error(`Error al verificar la inserción del juego con ID ${gameId}:`, error);
      throw error;
    }
  }
  

}
