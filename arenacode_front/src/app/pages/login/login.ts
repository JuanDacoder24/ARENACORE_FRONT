import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/iuser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard'])
    }
  }

  async getUser(loginForm: NgForm) {
  const loginUser: IUser = loginForm.value as IUser
  try {
    let res = await this.userService.login(loginUser)
    console.log("Respuesta del login:", res)

    if (res.data?.token) {
      this.userService.setAuthData(
        res.data.token,
        res.data.user.id,
        res.data.user.nombre,
        res.data.user.email,
        res.data.user.username
      )
            
      this.router.navigate(['/dashboard'])
      loginForm.reset()
    } else if (res.token) {
      this.userService.setAuthData(
        res.token,
        res.user.id,
        res.user.nombre,
        res.user.email,
        res.user.username
      )
      console.log('Token guardado:', localStorage.getItem('token'))
      await this.router.navigate(['/dashboard'])

      loginForm.reset()
    }

  } catch (error) {
    console.error("Error en login:", error)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      background: '#0d2a4a',
      color: 'white',
      confirmButtonColor: '#27ae60',
      text: "Credenciales incorrectas",
    });
    loginForm.reset();
  }
}
}