import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnirseviajePage } from './unirseviaje.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('UnirseviajePage', () => {
  let component: UnirseviajePage;
  let fixture: ComponentFixture<UnirseviajePage>;
  let firestoreMock: any;
  let authMock: any;
  let alertControllerMock: any;
  let navControllerMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mock de AngularFirestore
    firestoreMock = {
      collection: jasmine.createSpy('collection').and.callFake(() => ({
        snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(
          of([
            {
              payload: {
                doc: {
                  id: 'viaje1',
                  data: () => ({
                    destino: 'Santiago',
                    capacidad: 3,
                    solicitudes: [],
                  }),
                },
              },
            },
          ])
        ),
        doc: jasmine.createSpy('doc').and.callFake(() => ({
          update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
        })),
      })),
    };

    // Mock de AngularFireAuth
    authMock = {
      authState: of({ email: 'test@example.com' }),
    };

    // Mock de AlertController
    alertControllerMock = {
      create: jasmine.createSpy('create').and.returnValue(
        Promise.resolve({
          present: jasmine.createSpy('present'),
          onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve()),
        })
      ),
    };

    // Mock de NavController
    navControllerMock = {
      navigateBack: jasmine.createSpy('navigateBack'),
    };

    // Mock de Router
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [UnirseviajePage],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
      ],
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: AngularFireAuth, useValue: authMock },
        { provide: AlertController, useValue: alertControllerMock },
        { provide: NavController, useValue: navControllerMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UnirseviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba mínima para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba básica para verificar que se cargan los viajes disponibles
  it('should fetch viajes on initialization', () => {
    component.ngOnInit();
    expect(firestoreMock.collection).toHaveBeenCalledWith('viajes');
    expect(component.viajesDisponibles).toEqual([
      {
        id: 'viaje1',
        destino: 'Santiago',
        capacidad: 3,
        solicitudes: [],
      },
    ]);
  });
});
