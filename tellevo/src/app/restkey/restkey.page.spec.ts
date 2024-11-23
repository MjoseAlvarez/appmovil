import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestkeyPage } from './restkey.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('RestkeyPage', () => {
  let component: RestkeyPage;
  let fixture: ComponentFixture<RestkeyPage>;
  let loginServiceMock: any;
  let routerMock: any;
  let alertControllerMock: any;

  beforeEach(async () => {
    // Mock del LoginService
    loginServiceMock = {
      resetPassword: jasmine.createSpy('resetPassword').and.returnValue(Promise.resolve()),
    };

    // Mock del Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Mock del AlertController
    alertControllerMock = {
      create: jasmine.createSpy('create').and.returnValue(
        Promise.resolve({
          present: jasmine.createSpy('present'),
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [RestkeyPage],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AlertController, useValue: alertControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestkeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error alert on invalid form', async () => {
    // Asignar valores inválidos
    component.email = 'invalid-email';
    component.run = '12345678';

    await component.onSubmit();

    // Verificar que se creó la alerta de formulario inválido
    expect(alertControllerMock.create).toHaveBeenCalledWith({
      header: 'Formulario inválido',
      message: 'Por favor, completa todos los campos correctamente.',
      buttons: ['OK'],
    });

    // Asegurarse de que resetPassword no fue llamado
    expect(loginServiceMock.resetPassword).not.toHaveBeenCalled();
  });

  it('should show error alert on failed reset', async () => {
    const errorMessage = 'Error al enviar correo.';
    loginServiceMock.resetPassword.and.returnValue(Promise.reject(new Error(errorMessage)));

    // Asignar valores válidos
    component.email = 'test@example.com';
    component.run = '12345678-9';

    await component.onSubmit();

    // Verificar que se creó la alerta de error
    expect(alertControllerMock.create).toHaveBeenCalledWith({
      header: 'Error',
      message: `Error en el reseteo: ${errorMessage}`,
      buttons: ['OK'],
    });

    // Asegurarse de que se intentó llamar a resetPassword
    expect(loginServiceMock.resetPassword).toHaveBeenCalledWith('test@example.com');
  });
});