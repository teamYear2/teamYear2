import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesCarousel } from './features-carousel';

describe('FeaturesCarousel', () => {
  let component: FeaturesCarousel;
  let fixture: ComponentFixture<FeaturesCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
