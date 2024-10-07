import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonPaginaComponent } from './boton-pagina.component';

describe('BotonPaginaComponent', () => {
  let component: BotonPaginaComponent;
  let fixture: ComponentFixture<BotonPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonPaginaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
