import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioContrasenaComponent } from './usuario-contrasena.component';

describe('UsuarioContrasenaComponent', () => {
  let component: UsuarioContrasenaComponent;
  let fixture: ComponentFixture<UsuarioContrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioContrasenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
