import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroModule } from './cadastro/cadastro.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path:'home',
    loadChildren: () => HomeModule
  },
  {
    path:'cadastro',
    loadChildren: () => CadastroModule
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
