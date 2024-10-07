import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerosListaComponent } from './generos-lista.component';

describe('GenerosListaComponent', () => {
  let component: GenerosListaComponent;
  let fixture: ComponentFixture<GenerosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
