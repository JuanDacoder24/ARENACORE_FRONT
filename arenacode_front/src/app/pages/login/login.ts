import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private router = inject(Router);
  private userService = inject(UserService);

email = 'progamer01@arena.com';
password = 'password123';
  errorMessage = '';

  constructor(){}

  ngOnInit(): void {
  }

  async getUser() {
    this.errorMessage = '';
    try {
      const response = await this.userService.login({
  usernameOrEmail: this.email,
  password: this.password
});

      if (response && response.success) {
  localStorage.setItem('accessToken', response.data.token); 
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.router.navigate(['/dashboard/home']);
      }
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Error al conectar con el servidor';
      console.error('Error de login:', error);

      // Fallback: Si el servidor backend no está corriendo, permitir entrar con el mock
      // Esto asegura que el usuario pueda ver la interfaz de estadísticas como solicitó.
      if (this.email === 'progamer01@arena.com' && this.password === 'password123') {
        console.warn('Backend inactivo. Autenticando localmente de forma simulada.');
    localStorage.setItem('accessToken', 'mock-token-12345'); // ✅ cambio aquí
        localStorage.setItem('user', JSON.stringify({ 
          id: 1, 
          username: 'ProGamer01', 
          email: 'progamer01@arena.com',
          nombre: 'Carlos'
        }));
        this.router.navigate(['/dashboard/home']);
      }
    }
  }
}