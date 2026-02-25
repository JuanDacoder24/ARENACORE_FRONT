<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> 96186fd (no message)

@Component({
  selector: 'app-navbar',
  imports: [],
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

>>>>>>> 96186fd (no message)
}
