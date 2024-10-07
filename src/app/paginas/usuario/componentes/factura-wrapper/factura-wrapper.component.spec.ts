import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaWrapperComponent } from './factura-wrapper.component';

describe('FacturaWrapperComponent', () => {
  let component: FacturaWrapperComponent;
  let fixture: ComponentFixture<FacturaWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturaWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
