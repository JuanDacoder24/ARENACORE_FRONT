import { Component, inject } from '@angular/core';
<<<<<<< HEAD
import { Router, RouterLink } from '@angular/router';
=======
import { Router } from '@angular/router';
>>>>>>> dev

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

<<<<<<< HEAD
  private router = inject(Router)
=======
  private router = inject(Router);
>>>>>>> dev

  // modificar si es necesario
  logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/home']);
  }
<<<<<<< HEAD

=======
>>>>>>> dev
}
