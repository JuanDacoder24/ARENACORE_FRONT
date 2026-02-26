import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export interface User {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: any;
    token: string;
  };
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/auth';

  login(credentials: any): Promise<LoginResponse> {
    return lastValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, credentials)
    );
  }

  getEstadisticas(userId: number): Promise<any> {
  return lastValueFrom(
    this.httpClient.get<any>(`http://localhost:3000/api/estadisticas/stats?userId=${userId}`)
  );
}
}
