import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../../../service/categorias/categoria.service';
import { Categoria } from '../../../../models/categoria.models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-form.html',
  styleUrls: ['./categoria-form.css']
})

export class CategoriaForm implements OnInit {
  categoriaForm: FormGroup;
  idCategoria: number | null = null;
  alerta: { tipo: 'success' | 'danger'; mensaje: string } | null = null;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // 👈 agregado
    private categoriaService: CategoriaService
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

ngOnInit(): void {
  console.log('🟢 CategoriaForm iniciado');

  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    console.log('📦 ID recibido:', id); // 👈 importante para debug

    if (id) {
      this.idCategoria = Number(id);
      console.log('📤 Cargando categoría con ID:', this.idCategoria);

      this.categoriaService.getCategoria(this.idCategoria).subscribe({
        next: (categoria) => {
          console.log('✅ Categoría recibida:', categoria);
          this.categoriaForm.patchValue({
            nombre: categoria.nombre ?? '',
            descripcion: categoria.descripcion ?? ''
          });
        },
        error: (err) =>
          this.mostrarAlerta('danger', 'Error cargando categoría: ' + err.message)
      });
    }
  });
}



private cargarCategoria(id: number): void {
  console.log('📤 Cargando categoría con ID:', id); // 👈
  this.categoriaService.getCategoria(id).subscribe({
    next: (categoria) => {
      console.log('✅ Categoría recibida:', categoria); // 👈
      this.categoriaForm.patchValue({
        nombre: categoria.nombre ?? '',
        descripcion: categoria.descripcion ?? ''
      });
    },
    error: (err) =>
      this.mostrarAlerta('danger', 'Error cargando categoría: ' + err.message)
  });
}



  

  onSubmit(): void {
    if (this.categoriaForm.invalid) {
      this.mostrarAlerta('danger', 'Formulario inválido');
      return;
    }

    const categoria = this.categoriaForm.value;

    if (this.idCategoria) {
      // 🟡 Editar categoría existente
      this.categoriaService.updateCategoria(this.idCategoria, categoria).subscribe({
        next: () => {
          this.mostrarAlerta('success', 'Categoría actualizada correctamente', () => this.goBack());
          this.categoriaForm.reset();
        },
        error: (err) => this.mostrarAlerta('danger', 'Error actualizando: ' + err.message)
      });
    } else {
      // 🟢 Crear nueva categoría
      this.categoriaService.createCategoria(categoria).subscribe({
        next: () => {
          this.mostrarAlerta('success', 'Categoría creada correctamente', () => this.goBack());
          this.categoriaForm.reset();
        },
        error: (err) => this.mostrarAlerta('danger', 'Error creando categoría: ' + err.message)
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  mostrarAlerta(tipo: 'success' | 'danger', mensaje: string, callback?: () => void): void {
    this.alerta = { tipo, mensaje };
    setTimeout(() => {
      this.alerta = null;
      if (callback) callback();
    }, 3000);
  }
}
