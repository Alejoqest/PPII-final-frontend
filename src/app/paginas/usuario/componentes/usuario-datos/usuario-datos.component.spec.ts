import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDatosComponent } from './usuario-datos.component';

describe('UsuarioDatosComponent', () => {
  let component: UsuarioDatosComponent;
  let fixture: ComponentFixture<UsuarioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
