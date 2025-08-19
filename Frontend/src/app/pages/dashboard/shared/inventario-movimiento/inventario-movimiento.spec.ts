import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioMovimiento } from './inventario-movimiento';

describe('InventarioMovimiento', () => {
  let component: InventarioMovimiento;
  let fixture: ComponentFixture<InventarioMovimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioMovimiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioMovimiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
