import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';


  const routes: Routes = [
    {
      path: '',
      loadChildren: './users/users.module#UsersModule'
    },
    {
      path: 'dashboard',
      loadChildren: './admins/admins.module#AdminsModule'
    },
    { 
      path: '**',    
      component: NotFoundComponent 
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules // <-This is our preloading
      ,enableTracing: false ,useHash: false})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
