import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NewUser } from '../_models/new-user';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage {
  
  newUser: NewUser = {} as NewUser;

  constructor(private loginSrv: LoginService, private router: Router) {}

  async registro() {
    try {
      await this.loginSrv.registro(
        this.newUser.nombre,
        this.newUser.run,
        this.newUser.email,
        this.newUser.password,
        this.newUser.password2
      );
      // Redirigir al menú después del registro exitoso
      this.router.navigate(['/menu']);
    } catch (error) {
      this.newUser.sedeError = 'Error en el registro: ' + (error as Error).message;
    }
  }
}
