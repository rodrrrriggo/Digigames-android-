import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./pages/catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./pages/preguntas/preguntas.module').then( m => m.PreguntasPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'vistarol',
    loadChildren: () => import('./pages/vistarol/vistarol.module').then( m => m.VistarolPageModule)
  },
  {
    path: 'vistaadmin',
    loadChildren: () => import('./pages/vistaadmin/vistaadmin.module').then( m => m.VistaadminPageModule)
  },
  {
    path: 'modifcontra',
    loadChildren: () => import('./pages/modifcontra/modifcontra.module').then( m => m.ModifcontraPageModule)
  },
  {
    path: 'agregarjuego',
    loadChildren: () => import('./pages/agregarjuego/agregarjuego.module').then( m => m.AgregarjuegoPageModule)
  },
  {
    path: 'cambiocontra',
    loadChildren: () => import('./pages/cambiocontra/cambiocontra.module').then( m => m.CambiocontraPageModule)
  },
  {
    path: 'editarjuego',
    loadChildren: () => import('./pages/editarjuego/editarjuego.module').then( m => m.EditarjuegoPageModule)
  },
  {
    path: 'perfiladmin',
    loadChildren: () => import('./pages/perfiladmin/perfiladmin.module').then( m => m.PerfiladminPageModule)
  },
  {
    path: 'estadisticasadmin',
    loadChildren: () => import('./pages/estadisticasadmin/estadisticasadmin.module').then( m => m.EstadisticasadminPageModule)
  },
  {
    path: 'verusuarios',
    loadChildren: () => import('./pages/verusuarios/verusuarios.module').then( m => m.VerusuariosPageModule)
  },
  {
    path: 'modifdatos',
    loadChildren: () => import('./pages/modifdatos/modifdatos.module').then( m => m.ModifdatosPageModule)
  },
  {
    path: 'probarapi',
    loadChildren: () => import('./pages/probarapi/probarapi.module').then( m => m.ProbarapiPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },


  

  

  

  
  


  
  

  
  
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
