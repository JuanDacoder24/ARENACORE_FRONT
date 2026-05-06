import { Component, inject } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/iuser';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {
    private router = inject(Router)
    private userService = inject(UserService)

    async registerUser(registerForm: NgForm) {
        const newUser: IUser = registerForm.value as IUser
        try {
            let res = await this.userService.register(newUser)
            if (res.data?.token) {
                this.userService.setAuthData(
                    res.data.token,
                    res.data.user.id,
                    res.data.user.nombre,
                    res.data.user.email
                )
            }
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                background: '#0d2a4a',
                color: 'white',
                confirmButtonColor: '#27ae60',
                text: 'Cuenta creada exitosamente'
            })
            this.router.navigate(['/dashboard']) 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                background: '#0d2a4a',
                color: 'white',
                confirmButtonColor: '#27ae60',
                text: 'No se pudo registrar el usuario.'
            })
        }
    }
}
