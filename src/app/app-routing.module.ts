import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { PublicacaoListComponent } from './components/publicacao/publicacao-list/publicacao-list.component';
import { PublicacaoReadComponent } from './components/publicacao/publicacao-read/publicacao-read.component';
import { LoginRedefineSenhaComponent } from './components/login/login-redefine-senha/login-redefine-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset_pw', component: LoginRedefineSenhaComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },  
      { path: 'publicacoes',                    component:   PublicacaoListComponent, canActivate: [AuthGuard]},
      { path: 'publicacoes/read/:id',           component:   PublicacaoReadComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }