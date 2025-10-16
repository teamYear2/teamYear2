import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../../../service/producto/producto.service';
import { CategoriaService } from '../../../../service/categorias/categoria.service';
import { Categoria } from '../../../../models/categoria.models';

@Component({
  selector: 'app-producto-form',
  imports: [ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrls: ['./producto-form.css']
})
export class ProductoForm {
  productoForm: FormGroup;

  constructor(private location: Location, private fb: FormBuilder, private router: Router,
    private productoService: ProductoService, private categoriaService: CategoriaService) {
    this.productoForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['']
    });
  }

  idProducto: number | null = null;
  categorias: Categoria[] = [];


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
            categoria: producto.categoria,
            descripcion: producto.descripcion ?? ''
          });
        },
        error: (err) => console.error('Error cargando producto:', err)
      });
    }

    this.cargarProductos()
  }

  cargarProductos(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        console.log('Categorias:', data);
        this.categorias = data;
        console.log(this.categorias);
      },
      error: (err) => console.error('Error al cargar productos', err),
    });
  }


  onSubmit(): void {
    if (this.productoForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    console.log(this.productoForm.value)

    const formValue = this.productoForm.value;

    // ⚙️ Transformamos la categoría para que solo envíe su id
    const producto = {
      ...formValue,
      categoria: formValue.categoria?.idCategoria
        ? Number(formValue.categoria.idCategoria)
        : null
    };
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
