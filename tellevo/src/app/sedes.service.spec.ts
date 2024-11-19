import { TestBed } from '@angular/core/testing';

import { SedesService } from './sedes.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('SedesService', () => {
  let service: SedesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase

      ]
    });
    service = TestBed.inject(SedesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid list of sedes', () => {
    const sedes = service.sedesRm;
    expect(sedes).toBeTruthy();
    expect(sedes.length).toBeGreaterThan(0);
    expect(sedes[0].nombre).toBe('Alameda'); // Validar un ejemplo
  });

  it('should log modified changes to console', () => {
    const consoleSpy = spyOn(console, 'log');
    service.setModalidad('Vespertino');
    expect(consoleSpy).toHaveBeenCalledWith('Modalidad cambiada a', 'Vespertino');
  });

  it('should change modalidad correctly', () => {
    service.setModalidad('Vespertino');
    expect(service.modalidad).toBe('Vespertino');
  });
});
