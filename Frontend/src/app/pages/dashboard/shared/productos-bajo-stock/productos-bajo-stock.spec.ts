import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosBajoStock } from './productos-bajo-stock';

describe('ProductosBajoStock', () => {
  let component: ProductosBajoStock;
  let fixture: ComponentFixture<ProductosBajoStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosBajoStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosBajoStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
