import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let loginServiceMock: any;
  let routerMock: any;
  let alertControllerMock: any;

  beforeEach(async () => {
    imports:[
      AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase

    ]
    // Mock del servicio LoginService
    loginServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve()),
    };

    // Mock del Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Mock del AlertController
    alertControllerMock = {
      create: jasmine.createSpy('create').and.returnValue({
        present: jasmine.createSpy('present'),
      }),
    };

    // Configuración del TestBed
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule, CommonModule],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AlertController, useValue: alertControllerMock },
        { provide: NavController, useValue: {} },
        { provide: ToastController, useValue: {} },
      ],
    }).compileComponents();

    // Crear el componente y su fixture
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset errors on calling resetErrors', () => {
    component.emailError = 'Error de email';
    component.passwordError = 'Error de contraseña';

    component.resetErrors();

    expect(component.emailError).toBe('');
    expect(component.passwordError).toBe('');
  });

  it('should navigate to menu on successful login', async () => {
    component.email = 'test@example.com';
    component.password = 'password123';

    await component.login();

    expect(routerMock.navigate).toHaveBeenCalledWith(['menu']);
    expect(component.passwordError).toBe('');
  });

  it('should show an error alert if login fails', async () => {
    const error = { message: 'auth/user-not-found' };
    loginServiceMock.login.and.returnValue(Promise.reject(error));

    component.email = 'nonexistent@example.com';
    component.password = 'password123';

    await component.login();

    expect(alertControllerMock.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Usuario no encontrado.',
      buttons: ['OK'],
    });
    expect(component.passwordError).toBe('Usuario no encontrado.');
  });
});
