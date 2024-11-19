import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewuserPage } from './newuser.page';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('NewuserPage', () => {
  let component: NewuserPage;
  let fixture: ComponentFixture<NewuserPage>;

  beforeEach(() => {
    imports:[
      AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase

    ]
    fixture = TestBed.createComponent(NewuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
