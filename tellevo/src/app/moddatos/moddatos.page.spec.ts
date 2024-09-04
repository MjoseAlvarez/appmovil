import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModdatosPage } from './moddatos.page';

describe('ModdatosPage', () => {
  let component: ModdatosPage;
  let fixture: ComponentFixture<ModdatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModdatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
