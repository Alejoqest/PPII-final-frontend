import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaOpcionesComponent } from './pelicula-opciones.component';

describe('PeliculaOpcionesComponent', () => {
  let component: PeliculaOpcionesComponent;
  let fixture: ComponentFixture<PeliculaOpcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaOpcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaOpcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
