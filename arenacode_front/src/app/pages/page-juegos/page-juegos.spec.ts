import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJuegos } from './page-juegos';

describe('PageJuegos', () => {
  let component: PageJuegos;
  let fixture: ComponentFixture<PageJuegos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageJuegos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageJuegos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
