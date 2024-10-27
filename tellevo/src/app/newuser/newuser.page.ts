import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage {
  email: string = '';
  password: string = '';
  password2: string = '';
  sedeError: string = '';

  constructor(private loginSrv: LoginService, private router: Router) {}  // Inyecta Router

  async registro() {
    try {
      await this.loginSrv.registro(this.email, this.password, this.password2);
      // Redirigir al menú después del registro exitoso
      this.router.navigate(['/menu']);  // Asegúrate de que la ruta 'menu' esté bien configurada
    } catch (error) {
      this.sedeError = 'Error en el registro: ' + (error as Error).message;
    }
  }
}
