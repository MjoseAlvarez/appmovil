import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogeadoGuard, VisitaGuard } from './utils/guards';  // Importa los guards

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [VisitaGuard]  // Protege la ruta home para usuarios logueados
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [VisitaGuard]  // Redirige a menu si ya está logueado
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
    canActivate: [LogeadoGuard]  // Protege la ruta menu
  },
  {
    path: 'menudriver',
    loadChildren: () => import('./menudriver/menudriver.module').then(m => m.MenudriverPageModule),
    canActivate: [LogeadoGuard]  // Protege la ruta menu
  },
  {
    path: 'moddatos',
    loadChildren: () => import('./moddatos/moddatos.module').then(m => m.ModdatosPageModule),
    canActivate: [LogeadoGuard]  // Protege la ruta menu
  },
  {
    path: 'modificaviaje',
    loadChildren: () => import('./modificaviaje/modificaviaje.module').then(m => m.ModificaviajePageModule),
    canActivate: [LogeadoGuard]  // Protege la ruta menu

  },
  {
    path: 'newuser',
    loadChildren: () => import('./newuser/newuser.module').then(m => m.NewuserPageModule),
    canActivate: [VisitaGuard]  // Protege la ruta menu

  },
  {
    path: 'programaviaje',
    loadChildren: () => import('./programaviaje/programaviaje.module').then(m => m.ProgramaviajePageModule),
    canActivate: [LogeadoGuard]  // Protege la ruta menu

  },
  {
    path: 'restkey',
    loadChildren: () => import('./restkey/restkey.module').then(m => m.RestkeyPageModule),
    //canActivate: [VisitaGuard]  // Protege la ruta menu

  },
  {
    path: 'solicitudesviaje',
    loadChildren: () => import('./solicitudesviaje/solicitudesviaje.module').then(m => m.SolicitudesviajePageModule),
    canActivate: [LogeadoGuard]  // Protege la ruta menu

  },
  {
    path: 'unirseviaje',
    loadChildren: () => import('./unirseviaje/unirseviaje.module').then(m => m.UnirseviajePageModule),
    canActivate: [LogeadoGuard]  // Protege la ruta menu

  },
  {
    path: 'userlog',
    loadChildren: () => import('./userlog/userlog.module').then(m => m.UserlogPageModule),
    canActivate: [LogeadoGuard]  // Protege la ruta menu

  },
  {
    path: '',
    redirectTo: 'home',  // Cambia el redireccionamiento inicial a home
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'  // Redirige cualquier ruta no existente a home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
