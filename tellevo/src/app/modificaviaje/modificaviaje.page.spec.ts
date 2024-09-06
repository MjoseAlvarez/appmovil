import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificaviajePage } from './modificaviaje.page';

describe('ModificaviajePage', () => {
  let component: ModificaviajePage;
  let fixture: ComponentFixture<ModificaviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
