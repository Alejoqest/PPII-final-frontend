import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaCantidadComponent } from './pelicula-cantidad.component';

describe('PeliculaCantidadComponent', () => {
  let component: PeliculaCantidadComponent;
  let fixture: ComponentFixture<PeliculaCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaCantidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
