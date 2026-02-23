import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTorneo } from './form-torneo';

describe('FormTorneo', () => {
  let component: FormTorneo;
  let fixture: ComponentFixture<FormTorneo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTorneo]
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
