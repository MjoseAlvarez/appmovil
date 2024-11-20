import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('LoginService', () => {
  let service: LoginService;
  let authMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
    ]})
    // Crear un mock manual del objeto auth de Firebase
    authMock = {
      sendPasswordResetEmail: jasmine.createSpy('sendPasswordResetEmail').and.returnValue(Promise.resolve()),
    };

    // Configurar el módulo de pruebas e inyectar el servicio
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)], // Inicializar Firebase
      providers: [LoginService],
    });

    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    // Verifica que el servicio se cree correctamente
    expect(service).toBeTruthy();
  });

  it('should send password reset email successfully', async () => {
    // Llama al método del servicio para enviar el correo de restablecimiento de contraseña
    spyOn(service, 'resetPassword').and.callFake(async () => authMock.sendPasswordResetEmail('test@example.com'));
    await service.resetPassword('test@example.com');
    expect(authMock.sendPasswordResetEmail).toHaveBeenCalledWith('test@example.com');
  });
});
