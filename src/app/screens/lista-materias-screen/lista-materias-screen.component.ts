import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-lista-materias-screen',
  templateUrl: './lista-materias-screen.component.html',
  styleUrls: ['./lista-materias-screen.component.scss']
})
export class ListaMateriasScreenComponent {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";

  constructor(
    public facadeService: FacadeService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if(this.token == ""){
      this.router.navigate([""]);
    }

  }

}
