import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PerfilUser } from './perfil-user';
import { UserService } from '../../service/user-service';

describe('PerfilUser', () => {
  let component: PerfilUser;
  let fixture: ComponentFixture<PerfilUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PerfilUser,
        HttpClientTestingModule
      ],
      providers: [
        { provide: UserService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
