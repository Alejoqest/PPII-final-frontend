import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatosListaComponent } from './formatos-lista.component';

describe('FormatosListaComponent', () => {
  let component: FormatosListaComponent;
  let fixture: ComponentFixture<FormatosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
