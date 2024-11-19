import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ProgramaviajePage } from './programaviaje.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('ProgramaviajePage', () => {
  let component: ProgramaviajePage;
  let fixture: ComponentFixture<ProgramaviajePage>;
  let alertControllerMock: any;
  let firestoreMock: any;

  beforeEach(async () => {
    imports:[
      AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase

    ]
    // Mock de Firestore
    firestoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({
        add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
      }),
    };

    // Mock de Auth
    const authMock = {
      authState: of({ email: 'test@example.com', displayName: 'Test User' }),
    };

    // Mock de AlertController
    alertControllerMock = {
      create: jasmine.createSpy('create').and.returnValue(
        Promise.resolve({
          present: jasmine.createSpy('present'),
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [ProgramaviajePage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: AngularFireAuth, useValue: authMock },
        { provide: AlertController, useValue: alertControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramaviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user email and name', () => {
    expect(component.viaje.userEmail).toEqual('test@example.com');
    expect(component.userName).toEqual('Test User');
  });

  it('should program a valid trip', async () => {
    component.viaje = {
      destino: 'Santiago',
      capacidad: 4,
      costoPorPersona: 5000,
      userEmail: 'test@example.com',
      fechaCreacion: new Date(),
    };

    await component.programarViaje();

    expect(firestoreMock.collection).toHaveBeenCalledWith('viajes');
    expect(firestoreMock.collection('viajes').add).toHaveBeenCalledWith({
      destino: 'Santiago',
      capacidad: 4,
      costoPorPersona: 5000,
      fechaCreacion: jasmine.any(Date),
      creador: 'test@example.com',
    });
  });

  it('should show an error if fields are missing', async () => {
    component.viaje = {
      destino: '',
      capacidad: 0,
      costoPorPersona: 0,
      userEmail: 'test@example.com',
      fechaCreacion: new Date(),
    };

    await component.programarViaje();

    expect(alertControllerMock.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'Todos los campos son obligatorios y deben tener valores válidos.',
      buttons: ['OK'],
    });
  });
});
