import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navsearchComponent } from './navsearch.component';

describe('navsearchComponent', () => {
  let component: navsearchComponent;
  let fixture: ComponentFixture<navsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [navsearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(navsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
