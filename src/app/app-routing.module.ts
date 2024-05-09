import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { ListaMateriasScreenComponent } from './screens/lista-materias-screen/lista-materias-screen.component';
import { RegistroMateriasComponent } from './partials/registro-materias/registro-materias.component';

const routes: Routes = [
  {path: '', component: LoginScreenComponent, pathMatch: 'full'}, //Raiz de la pagina principal
  {path: 'registro-usuarios', component: RegistroScreenComponent,pathMatch: 'full'}, //Ruta para el login
  {path: 'registro-usuarios/:rol/:id', component: RegistroScreenComponent,pathMatch: 'full'}, //Ruta para el login que necesita dos parametros
  {path: 'home', component: HomeScreenComponent,pathMatch: 'full'},
  {path: 'administrador', component: AdminScreenComponent,pathMatch: 'full'},
  {path: 'alumnos', component: AlumnosScreenComponent,pathMatch: 'full'},
  {path: 'maestros', component: MaestrosScreenComponent,pathMatch: 'full'},
  {path: 'graficas', component: GraficasScreenComponent,pathMatch: 'full'},

  {path: 'lista-materias', component: ListaMateriasScreenComponent,pathMatch: 'full'},
  {path: 'registro-materias', component: RegistroMateriasComponent,pathMatch: 'full'},
  {path: 'registro-materias/:id', component: RegistroMateriasComponent,pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
