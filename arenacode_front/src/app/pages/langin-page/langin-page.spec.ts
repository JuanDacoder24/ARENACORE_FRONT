import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { LanginPage } from './langin-page';

describe('LanginPage', () => {
  let component: LanginPage;
  let fixture: ComponentFixture<LanginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LanginPage,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LanginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
