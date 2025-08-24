import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Category {
  id: number;
  name: string;
  description?: string;
  productCount?: number;
}

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categoria-list.html',
  styleUrls: ['./categoria-list.css']
})
export class CategoriaList {
  categories: Category[] = [];
  private nextId = 1;

  // Nueva: categoría seleccionada
  selectedCategoryId: number | null = null;

  constructor(private router: Router) {
    this.categories = [
      { id: this.nextId++, name: 'Periféricos', description: 'Teclados, mouse, audífonos, etc.', productCount: 32 },
      { id: this.nextId++, name: 'Monitores', description: 'Monitores LED, 4K, gaming', productCount: 12 },
      { id: this.nextId++, name: 'Almacenamiento', description: 'Discos HDD, SSD, memorias USB', productCount: 20 },
      { id: this.nextId++, name: 'Componentes', description: 'Procesadores, placas madre, memorias RAM', productCount: 18 },
      { id: this.nextId++, name: 'Impresoras', description: 'Impresoras láser, de tinta y multifunción', productCount: 9 },
      { id: this.nextId++, name: 'Redes', description: 'Routers, switches, placas de red', productCount: 14 },
      { id: this.nextId++, name: 'Sillas Gamer', description: 'Sillas ergonómicas para oficina y gaming', productCount: 7 },
    ];
  }

  changeSection(section: string) {
    this.router.navigate([`/${section}`]);
  }

  editCategory(cat: Category) {
    this.router.navigate([`/dashboard/categoria-form`, cat.id]);
  }

  deleteCategory(cat: Category) {
    const ok = window.confirm(`¿Eliminar la categoría "${cat.name}"?`);
    if (!ok) return;
    this.categories = this.categories.filter(c => c.id !== cat.id);
    if (this.selectedCategoryId === cat.id) this.selectedCategoryId = null;
  }

  // Nueva: seleccionar categoría
  selectCategory(cat: Category) {
    this.selectedCategoryId = cat.id;
  }

  // Opcional: para @for track
  trackById(_: number, item: Category) {
    return item.id;
  }
}
