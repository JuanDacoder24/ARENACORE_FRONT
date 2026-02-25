import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { Error404 } from './error404';

describe('Error404', () => {
  let component: Error404;
  let fixture: ComponentFixture<Error404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Error404,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Error404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
