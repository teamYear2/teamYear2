import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../../service/categorias/categoria.service';
import { Categoria } from '../../../../models/categoria.models';


@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-list.html',
  styleUrls: ['./categoria-list.css']
})
export class CategoriaList implements OnInit {
  categories: Categoria[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit() {
    // Los datos se cargan desde el db.json
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
  }

  changeSection(section: string) {
    this.router.navigate([`/${section}`]);
  }

  editCategory(cat: Categoria) {
    this.router.navigate([`/dashboard/categoria-form`, cat.id]);
  }

  deleteCategory(cat: Categoria) {
    const ok = window.confirm(`¿Eliminar la categoría "${cat.nombre}"?`);
    if (!ok) return;
    this.categories = this.categories.filter(c => c.id !== cat.id);
    if (this.selectedCategoryId === cat.id) this.selectedCategoryId = null;
  }

  selectCategory(cat: Categoria) {
    this.selectedCategoryId = cat.id;
  }

  trackById(_: number, item: Categoria) {
    return item.id;
  }
}
