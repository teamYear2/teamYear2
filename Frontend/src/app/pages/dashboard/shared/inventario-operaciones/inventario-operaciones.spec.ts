import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioOperaciones } from './inventario-operaciones';

describe('InventarioOperaciones', () => {
  let component: InventarioOperaciones;
  let fixture: ComponentFixture<InventarioOperaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioOperaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioOperaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
