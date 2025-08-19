import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioTarjetasMetricas } from './inventario-tarjetas-metricas';

describe('InventarioTarjetasMetricas', () => {
  let component: InventarioTarjetasMetricas;
  let fixture: ComponentFixture<InventarioTarjetasMetricas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioTarjetasMetricas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioTarjetasMetricas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
