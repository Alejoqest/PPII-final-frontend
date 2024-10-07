import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaInfoPage } from './peliculaInfo.page';

describe('PeliculaInfoPage', () => {
  let component: PeliculaInfoPage;
  let fixture: ComponentFixture<PeliculaInfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaInfoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
