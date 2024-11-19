import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserlogPage } from './userlog.page';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from '../login.service';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('UserlogPage', () => {
  let component: UserlogPage;
  let fixture: ComponentFixture<UserlogPage>;
  let alertControllerMock: any;
  let loginServiceMock: any;
  let routerMock: any;
  let afAuthMock: any;

  beforeEach(async () => {
    imports:[
      AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase

    ]
    alertControllerMock = {
      create: jasmine.createSpy('create').and.returnValue({
        present: jasmine.createSpy('present'),
      }),
    };

    loginServiceMock = {
      cerrarSesion: jasmine.createSpy('cerrarSesion').and.returnValue(Promise.resolve()),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    afAuthMock = {
      authState: of({ email: 'test@example.com' }), // Mock del authState con un valor observable
    };

    await TestBed.configureTestingModule({
      declarations: [UserlogPage],
      providers: [
        { provide: AlertController, useValue: alertControllerMock },
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AngularFireAuth, useValue: afAuthMock }, // Proporcionamos el mock actualizado
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user email on ngOnInit', () => {
    component.ngOnInit();
    expect(component.userEmail).toBe('test@example.com'); // Verifica que el correo se haya inicializado correctamente
  });

  it('should navigate to home on successful logout', async () => {
    await component.presentLogoutAlert();
    const handler = alertControllerMock.create.calls.mostRecent().args[0].buttons[1].handler;
    await handler(); // Simula clic en el botón "Cerrar sesión"

    expect(loginServiceMock.cerrarSesion).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should not navigate on cancel logout', async () => {
    await component.presentLogoutAlert();
    const handler = alertControllerMock.create.calls.mostRecent().args[0].buttons[0].handler;
    handler(); // Simula clic en el botón "Cancelar"

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
