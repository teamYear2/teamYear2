import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMasVendidos } from './productos-mas-vendidos';

describe('ProductosMasVendidos', () => {
  let component: ProductosMasVendidos;
  let fixture: ComponentFixture<ProductosMasVendidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosMasVendidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosMasVendidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
