import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaPage } from './busqueda.page';

describe('BusquedaPage', () => {
  let component: BusquedaPage;
  let fixture: ComponentFixture<BusquedaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusquedaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
