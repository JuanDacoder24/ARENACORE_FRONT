import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private httpClient = inject(HttpClient)
  private baseUrl: string = 'http://localhost:8080/login'

  login(user: User): Promise<any>{
    return lastValueFrom(this.httpClient.post<any>(this.baseUrl + 'login', user))
  }

  
}