import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestroService } from 'src/app/services/maestro.service';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';

@Component({
  selector: 'app-maestros-screen',
  templateUrl: './maestros-screen.component.html',
  styleUrls: ['./maestros-screen.component.scss']
})
export class MaestrosScreenComponent {

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_maestros: any[] = [];
//Para la tabla
displayedColumns: string[] = ['clave_maestro', 'nombre', 'email', 'fecha_de_nacimiento','rfc', 'telefono', 'cubiculo', 'area_investigacion', 'materias_json', 'editar', 'eliminar'];

dataSource = new MatTableDataSource<DatosUsuario>(this.lista_maestros as DatosUsuario[]);

@ViewChild(MatPaginator) paginator: MatPaginator;

constructor(
  public facadeService: FacadeService,
  private maestroService:MaestroService,
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

  this.obtenerMaestros();
  //Para paginador
  this.initPaginator();
}
//Para paginación
public initPaginator(){
  setTimeout(() => {
    this.dataSource.paginator = this.paginator;
    //console.log("Paginator: ", this.dataSourceIngresos.paginator);
    //Modificar etiquetas del paginador a español
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 / ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
  },500);
  //this.dataSourceIngresos.paginator = this.paginator;
}
 //Obtener alumnos
 public obtenerMaestros(){
  this.maestroService.obtenerListaMaestros().subscribe(
    (response)=>{
      this.lista_maestros = response;
      console.log("Lista users: ", this.lista_maestros);
      if(this.lista_maestros.length > 0){
        //Agregar datos del nombre e email
        this.lista_maestros.forEach(usuario => {
          usuario.first_name = usuario.user.first_name;
          usuario.last_name = usuario.user.last_name;
          usuario.email = usuario.user.email;
        });
        console.log("Otro user: ", this.lista_maestros);

        this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_maestros as DatosUsuario[]);
      }
    }, (error)=>{
      alert("No se pudo obtener la lista de usuarios");
    }
  );
}
//Funcion para editar
public goEditar(idUser: number){
  this.router.navigate(["registro-usuarios/maestro/"+idUser]);
}

public delete(idUser: number){
  const dialogRef = this.dialog.open(EliminarUserModalComponent,{
    data: {id: idUser, rol: 'maestro'}, //Se pasan valores a través del componente
    height: '288px',
    width: '328px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result.isDelete){
      console.log("Maestro eliminado");
      //Recargar página
      window.location.reload();
    }else{
      alert("Maestro no eliminado ");
      console.log("No se eliminó el Maestro");
    }
  });
}


}

//Esto va fuera de la llave que cierra la clase
export interface DatosUsuario {
  id: number,
  clave_maestro: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_de_nacimiento: string,
  rfc: string,
  telefono: string,
  cubiculo: string,
  area_investigacion: string,
  materias_json: [],
}
