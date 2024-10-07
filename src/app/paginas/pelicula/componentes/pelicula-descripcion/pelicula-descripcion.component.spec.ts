import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaDescripcionComponent } from './pelicula-descripcion.component';

describe('PeliculaDescripcionComponent', () => {
  let component: PeliculaDescripcionComponent;
  let fixture: ComponentFixture<PeliculaDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaDescripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
