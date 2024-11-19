import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudesviajePage } from './solicitudesviaje.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importar Firestore
import { environment } from 'src/environments/environment';

describe('SolicitudesviajePage', () => {
  let component: SolicitudesviajePage;
  let fixture: ComponentFixture<SolicitudesviajePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitudesviajePage], // Declarar el componente
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
        AngularFirestoreModule, // Importar Firestore
      ],
    }).compileComponents();

    // Crear la instancia del componente
    fixture = TestBed.createComponent(SolicitudesviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que el componente se crea correctamente
    expect(component).toBeTruthy();
  });
});
