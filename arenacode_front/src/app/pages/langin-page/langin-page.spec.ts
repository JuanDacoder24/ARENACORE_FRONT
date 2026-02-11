import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanginPage } from './langin-page';

describe('LanginPage', () => {
  let component: LanginPage;
  let fixture: ComponentFixture<LanginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanginPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
