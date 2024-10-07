import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionPeliculaComponent } from './creacion-pelicula.component';

describe('CreacionPeliculaComponent', () => {
  let component: CreacionPeliculaComponent;
  let fixture: ComponentFixture<CreacionPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreacionPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
