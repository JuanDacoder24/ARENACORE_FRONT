import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser';

@Injectable({ providedIn: 'root' })
export class UserService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/auth';

  private tokenSignal = signal<string>(localStorage.getItem('token') || '');
  private idSignal = signal<number>(Number(localStorage.getItem('id')) || 0);
  private nombreSignal = signal<string>(localStorage.getItem('nombre') || '');
  private emailSignal = signal<string>(localStorage.getItem('email') || '');
  private usernameSignal = signal<string>(localStorage.getItem('username') || '');

  constructor() {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.tokenSignal()}`,
    });
  }

  async login(user: IUser): Promise<any> {
    const res = await firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/login`, user));
    const token = res.token || res.data?.token;
    const userData = res.user || res.data?.user;
    if (token && userData) {
      this.setAuthData(token, userData.id, userData.nombre, userData.email, userData.username);
    }
    return res;
  }

  getEstadisticas(userId: number): Promise<any> {
    return lastValueFrom(
      this.httpClient.get<any>(`http://localhost:3000/api/estadisticas/stats?userId=${userId}`)
    );
  }

  setAuthData(token: string, id: number, nombre: string, email: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', String(id));
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('email', email);
    localStorage.setItem('username', username); 
    this.tokenSignal.set(token);
    this.idSignal.set(id);
    this.nombreSignal.set(nombre);
    this.usernameSignal.set(username);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    this.tokenSignal.set('');
    this.idSignal.set(0);
    this.nombreSignal.set('');
    this.emailSignal.set('');
    this.usernameSignal.set('');
  }

  async register(user: IUser): Promise<any> {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/register`, user));
  }
}
