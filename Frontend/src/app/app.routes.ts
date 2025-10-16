import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductoList } from './pages/dashboard/shared/producto-list/producto-list';
import { CategoriaList } from './pages/dashboard/shared/categoria-list/categoria-list';
import { ProductoForm } from './pages/dashboard/shared/producto-form/producto-form';
import { CategoriaForm } from './pages/dashboard/shared/categoria-form/categoria-form';
import { Login } from './pages/login/login.component';
import { Registro } from './pages/registro/registro';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { InventarioOperaciones } from './pages/dashboard/shared/inventario-operaciones/inventario-operaciones';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard, // Solo para usuarios logueados
    children: [
      { path: 'producto-list', component: ProductoList },
      { path: 'categoria-list', component: CategoriaList },
      { path: 'producto-form', component: ProductoForm },
      { path: 'producto-form/:id', component: ProductoForm },
      { path: 'categoria-form', component: CategoriaForm },
      { path: 'categoria-form/:id', component: CategoriaForm },
      { path: 'inventario-operaciones', component: InventarioOperaciones },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'home', component: Home },
      { path: 'login', component: Login },
      { path: 'registro', component: Registro },
      { path: 'quienes-somos', component: QuienesSomos },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];
