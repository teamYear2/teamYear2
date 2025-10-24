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

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(data => {
      console.log('Categorías recibidas desde el backend:', data);
      this.categories = data;
    });
  }

  changeSection(section: string) {
    this.router.navigate([`/${section}`]);
  }

 editCategory(cat: Categoria) {
  console.log('Editar categoría con ID:', cat.idCategoria);
  this.router.navigate([`/dashboard/categoria-form`, cat.idCategoria]);
}


  deleteCategory(cat: Categoria) {
    const confirmar = confirm(`¿Eliminar la categoría "${cat.nombre}"?`);
    if (!confirmar) return;

    this.categoriaService.deleteCategoria(cat.idCategoria!).subscribe({
      next: () => {
        // Si se elimina correctamente del backend
        this.categories = this.categories.filter(c => c.idCategoria !== cat.idCategoria);
        alert(`Categoría "${cat.nombre}" eliminada correctamente`);
      },
      error: (err) => {
        console.error('Error eliminando categoría:', err);
        alert('No se pudo eliminar la categoría');
      }
    });
  }

  selectCategory(cat: Categoria) {
    this.selectedCategoryId = cat.idCategoria;
  }

  trackById(_: number, item: Categoria) {
    return item.idCategoria;
  }
}

