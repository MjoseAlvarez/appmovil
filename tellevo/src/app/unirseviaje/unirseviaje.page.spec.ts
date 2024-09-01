import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnirseviajePage } from './unirseviaje.page';

describe('UnirseviajePage', () => {
  let component: UnirseviajePage;
  let fixture: ComponentFixture<UnirseviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirseviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
