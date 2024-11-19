import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPage } from './menu.page';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('MenuPage', () => {
  let component: MenuPage;
  let fixture: ComponentFixture<MenuPage>;
  let loginServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    imports:[
      AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase

    ]
    // Mock del servicio LoginService
    loginServiceMock = {
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(Promise.resolve({ email: 'test@example.com' })),
    };

    // Mock del Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    // Configuración del TestBed
    await TestBed.configureTestingModule({
      declarations: [MenuPage],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: NavController, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check authentication on initialization', async () => {
    spyOn(component, 'checkAuthentication').and.callThrough();
    await component.ngOnInit();
    expect(component.checkAuthentication).toHaveBeenCalled();
    expect(loginServiceMock.getCurrentUser).toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled(); // No debería redirigir si el usuario está autenticado
  });

  it('should navigate to login if user is not authenticated', async () => {
    loginServiceMock.getCurrentUser.and.returnValue(Promise.resolve(null)); // Simular usuario no autenticado

    await component.checkAuthentication();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to menudriver when goToConductor is called', async () => {
    await component.goToConductor();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/menudriver']);
  });

  it('should navigate to unirseviaje when goToPasajero is called', async () => {
    await component.goToPasajero();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/unirseviaje']);
  });
});
