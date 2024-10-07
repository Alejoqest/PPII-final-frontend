import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroPage } from './carro.page';

describe('CarroPage', () => {
  let component: CarroPage;
  let fixture: ComponentFixture<CarroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarroPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
