import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserlogPage } from './userlog.page';

describe('UserlogPage', () => {
  let component: UserlogPage;
  let fixture: ComponentFixture<UserlogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
