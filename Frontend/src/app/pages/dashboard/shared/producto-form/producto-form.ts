import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../../service/producto/producto.service';

@Component({
  selector: 'app-producto-form',
  imports: [ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrls: ['./producto-form.css']
})
export class ProductoForm {
  productoForm: FormGroup;

  constructor(private location: Location, private fb: FormBuilder, private router: Router,
    private productoService: ProductoService) {
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      categoria: [''],
      descripcion: ['']
    });
  }

  idProducto: number | null = null;


  ngOnInit(): void {
    const url = this.router.url;

    const idMatch = url.match(/producto-form\/(\d+)/);
    const id = idMatch ? Number(idMatch[1]) : null;
    this.idProducto = id;

    if (id !== null) {
      this.productoService.getProductoPorId(id).subscribe({
        next: (producto) => {
          console.log('Producto recibido:', producto);
          this.productoForm.patchValue({
            codigo: producto.codigo ?? '',
            nombre: producto.nombre ?? '',
            categoria: producto.categoria ?? 'Sin categoría',
            descripcion: producto.descripcion ?? ''
          });
        },
        error: (err) => console.error('Error cargando producto:', err)
      });
    }
  }


  onSubmit(): void {
    if (this.productoForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const producto = this.productoForm.value;

    if (this.idProducto) {
      // Editar producto existente
      const productoEditado = { ...producto, id: this.idProducto };
      this.productoService.updateProducto(productoEditado).subscribe({
        next: () => {
          this.mostrarAlerta('success', 'Producto actualizado correctamente', () => {
            this.goBack();
          });
          console.log('Producto actualizado correctamente');
          this.productoForm.reset();
        },
        error: (err) => this.mostrarAlerta('danger', 'Error actualizando producto: ' + err.message),
      });
    } else {
      // Crear nuevo producto
      if (!producto.categoria || producto.categoria.trim() === '') {
        delete producto.categoria;
      }

      console.log('Objeto limpio para crear:', producto);


      this.productoService.createProducto(producto).subscribe({
        next: () => {
          this.mostrarAlerta('success', 'Producto creado correctamente', () => {
            
          });
          console.log('Producto creado correctamente');
          this.productoForm.reset();
        },
        error: (err) => this.mostrarAlerta('danger', 'Error creando producto: ' + err.message),
      });
    }
  }

  goBack() {
    this.location.back();
  }

  alerta: { tipo: 'success' | 'danger', mensaje: string } | null = null;

  mostrarAlerta(tipo: 'success' | 'danger', mensaje: string, callback?: () => void) {
    this.alerta = { tipo, mensaje };
    setTimeout(() => {
      this.alerta = null;
      if (callback) callback();
    }, 4000);
  }


}
