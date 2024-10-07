import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDetallesComponent } from './factura-detalles.component';

describe('FacturaDetallesComponent', () => {
  let component: FacturaDetallesComponent;
  let fixture: ComponentFixture<FacturaDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
