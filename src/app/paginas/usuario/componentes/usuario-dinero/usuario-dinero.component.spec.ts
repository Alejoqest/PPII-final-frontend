import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDineroComponent } from './usuario-dinero.component';

describe('UsuarioDineroComponent', () => {
  let component: UsuarioDineroComponent;
  let fixture: ComponentFixture<UsuarioDineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDineroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
