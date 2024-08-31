import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestartkeyPage } from './restartkey.page';

describe('RestartkeyPage', () => {
  let component: RestartkeyPage;
  let fixture: ComponentFixture<RestartkeyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestartkeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
