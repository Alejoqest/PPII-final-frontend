import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaContentComponent } from './pelicula-cuerpo.component';

describe('PeliculaContentComponent', () => {
  let component: PeliculaContentComponent;
  let fixture: ComponentFixture<PeliculaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
