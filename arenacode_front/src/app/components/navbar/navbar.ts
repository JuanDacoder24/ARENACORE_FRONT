<<<<<<< HEAD
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
=======
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
>>>>>>> interfaz_login
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

<<<<<<< HEAD
=======
  private router = inject(Router)

  //moficar si es necesario 
  logout(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.router.navigate(['/home'])
  }

>>>>>>> interfaz_login
}
