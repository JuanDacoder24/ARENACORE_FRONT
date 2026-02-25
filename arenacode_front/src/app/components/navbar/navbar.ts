import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private router = inject(Router)

  //moficar si es necesario 
  logout(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.router.navigate(['/home'])
  }

}
