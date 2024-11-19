import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModdatosPage } from './moddatos.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('ModdatosPage', () => {
  let component: ModdatosPage;
  let fixture: ComponentFixture<ModdatosPage>;

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    imports:[
      AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase

    ]
    // Crea una instancia del componente ModdatosPage
    fixture = TestBed.createComponent(ModdatosPage);
    // Asigna la instancia del componente a la variable component
    component = fixture.componentInstance;
    // Detecta los cambios en el componente para actualizar la vista
    fixture.detectChanges();
  });

  // Prueba básica para verificar que el componente se crea correctamente
  it('should create', () => {
    // Verifica que la instancia del componente sea verdadera (exista)
    expect(component).toBeTruthy();
  });
});
