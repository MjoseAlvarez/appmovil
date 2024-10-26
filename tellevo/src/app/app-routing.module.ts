import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { logeadoGuard } from './utils/guards';  // Importa el guard que protege las rutas

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [logeadoGuard]  // Protege la ruta home para usuarios logueados
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'newuser',
    loadChildren: () => import('./newuser/newuser.module').then(m => m.NewuserPageModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
    canActivate: [logeadoGuard]  // Protege la ruta menu
  },
  {
    path: '',
    redirectTo: 'login',  // Cambia el redireccionamiento inicial a login
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'  // Redirige cualquier ruta no existente a login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
