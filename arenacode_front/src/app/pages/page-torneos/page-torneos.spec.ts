import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTorneos } from './page-torneos';

describe('PageTorneos', () => {
  let component: PageTorneos;
  let fixture: ComponentFixture<PageTorneos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTorneos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTorneos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
