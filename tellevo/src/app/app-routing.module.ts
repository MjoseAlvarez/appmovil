import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'programaviaje', loadChildren: () => import('./programaviaje/programaviaje.module').then(m => m.ProgramaviajePageModule) },
  { path: 'unirseviaje', loadChildren: () => import('./unirseviaje/unirseviaje.module').then(m => m.UnirseviajePageModule) },
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule) },
  { path: 'newuser', loadChildren: () => import('./newuser/newuser.module').then(m => m.NewuserPageModule) },
  {
    path: 'restkey',
    loadChildren: () => import('./restkey/restkey.module').then(m => m.RestkeyPageModule)
  },
  {
    path: 'userlog',
    loadChildren: () => import('./userlog/userlog.module').then( m => m.UserlogPageModule)
  },  {
    path: 'moddatos',
    loadChildren: () => import('./moddatos/moddatos.module').then( m => m.ModdatosPageModule)
  },
  {
    path: 'menudriver',
    loadChildren: () => import('./menudriver/menudriver.module').then( m => m.MenudriverPageModule)
  },
  {
    path: 'modificaviaje',
    loadChildren: () => import('./modificaviaje/modificaviaje.module').then( m => m.ModificaviajePageModule)
  },
  {
    path: 'solicitudesviaje',
    loadChildren: () => import('./solicitudesviaje/solicitudesviaje.module').then( m => m.SolicitudesviajePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
