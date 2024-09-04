import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestkeyPage } from './restkey.page';

describe('RestkeyPage', () => {
  let component: RestkeyPage;
  let fixture: ComponentFixture<RestkeyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestkeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
