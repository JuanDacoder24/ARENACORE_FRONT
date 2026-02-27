import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormTorneo } from './form-torneo';

describe('FormTorneo', () => {
  let component: FormTorneo;
  let fixture: ComponentFixture<FormTorneo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTorneo, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTorneo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
