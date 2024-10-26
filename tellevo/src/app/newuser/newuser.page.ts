import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage {
  email: string = '';
  password: string = '';
  sedeError: string = '';
  router: any;

  constructor(private loginSrv: LoginService) {}
  async registro() {
    try {
      await this.loginSrv.registro(this.email, this.password);
      // Redirigir al menú después del registro exitoso
      this.router.navigate(['/menu']);  // Asegúrate de que la ruta 'menu' esté bien configurada
    } catch (error) {
      this.sedeError = 'Error en el registro: ' + (error as Error).message;
    }
  }
  
}
