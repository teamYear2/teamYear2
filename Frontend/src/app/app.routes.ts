import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductoList } from './pages/dashboard/shared/producto-list/producto-list';
import { CategoriaList } from './pages/dashboard/shared/categoria-list/categoria-list';
import { ProductoForm } from './pages/dashboard/shared/producto-form/producto-form';
import { CategoriaForm } from './pages/dashboard/shared/categoria-form/categoria-form';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard, // Solo para usuarios logueados
    children: [
      { path: 'producto-list', component: ProductoList },
      { path: 'categoria-list', component: CategoriaList },
      { path: 'producto-form', component: ProductoForm },
      { path: 'categoria-form', component: CategoriaForm },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
