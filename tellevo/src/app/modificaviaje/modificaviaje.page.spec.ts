import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarViajePage } from './modificaviaje.page';

describe('ModificaviajePage', () => {
  let component: ModificarViajePage;
  let fixture: ComponentFixture<ModificarViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
