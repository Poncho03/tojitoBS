import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: 'init', loadChildren: () => import('./pages/init/init.module').then( m => m.InitPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) },
  { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule) },
  { path: 'servicios', loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule) },
  { path: 'ajustes', loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule) },
  { path: 'fotosneg', loadChildren: () => import('./pages/fotosneg/fotosneg.module').then( m => m.FotosnegPageModule) },
  { path: 'form-business', loadChildren: () => import('./pages/form-business/form-business.module').then( m => m.FormBusinessPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
