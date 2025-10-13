import { ProductoService } from '../../../../service/producto/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovimientoService } from '../../../../service/movimiento/movimiento.service';
import { Producto } from '../../../../models/producto.model';
import { Movimiento } from '../../../../models/movimiento.model';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-inventario-operaciones',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inventario-operaciones.html',
  styleUrl: './inventario-operaciones.css'
})
export class InventarioOperaciones {
  movimientoForm!: FormGroup;
  productos: Producto[] = [];

  // Este valor puede venir de un servicio, route param, o contexto compartido
  inventarioId: number = Number(localStorage.getItem('idInventario'));

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private productoService: ProductoService,
    private movimientoService: MovimientoService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.cargarProductos();
  }

  initForm(): void {
    this.movimientoForm = this.fb.group({
      productoId: [null, Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      tipo: [null, Validators.required],
    });
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        console.log('Productos:', data);
        this.productos = data;
        console.log(this.productos);
      },
      error: (err) => console.error('Error al cargar productos', err),
    });
  }

  registrarMovimiento(): void {
    if (this.movimientoForm.invalid) return;

    const { productoId, cantidad, tipo } = this.movimientoForm.value;

    const movimiento: Movimiento = {
      producto_id: Number(productoId),
      cantidad: Number(cantidad),
      tipo_operacion: tipo,
      inventario_id: Number(this.inventarioId),
    };

    console.log('Movimiento enviado:', movimiento);

    this.movimientoService.createMovimiento(movimiento).subscribe({
      next: () => {
        this.mostrarAlerta('success', 'Movimiento generado correctamente');
        console.log('Movimiento registrado con éxito');
        this.movimientoForm.reset();
      },
      error: (err) => {console.error('Error al registrar movimiento', err);
        this.mostrarAlerta('danger', 'Error generando movimiento: ' + err.message);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  alerta: { tipo: 'success' | 'danger', mensaje: string } | null = null;

mostrarAlerta(tipo: 'success' | 'danger', mensaje: string) {
  this.alerta = { tipo, mensaje };
  setTimeout(() => this.alerta = null, 4000);
}


}