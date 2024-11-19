import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenudriverPage } from './menudriver.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('MenudriverPage', () => {
  let component: MenudriverPage;
  let fixture: ComponentFixture<MenudriverPage>;

  beforeEach(() => {
    imports:[
      AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase

    ]
    fixture = TestBed.createComponent(MenudriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
