import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarMateriaModalComponent } from 'src/app/modals/eliminar-materia-modal/eliminar-materia-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';


@Component({
  selector: 'app-lista-materias-screen',
  templateUrl: './lista-materias-screen.component.html',
  styleUrls: ['./lista-materias-screen.component.scss']
})
export class ListaMateriasScreenComponent implements OnInit{

  public name_user:string = "";
  public rol:string = "";
  public token : string = "";
  public lista_materias: any[] = [];



  //Vista de tabla
  displayedColumns: string[] = ['nrc', 'nombre', 'seccion','dias_json', 'horaInicio', 'horaFin', 'salon', 'programa_educativo', 'editar', 'eliminar'];

  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_materias as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public facadeService: FacadeService,
    private router: Router,
    public dialog: MatDialog,
    private materiasService: MateriasService
  ){}

  ngOnInit(): void {

    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);

    if (this.token == "") {
      this.router.navigate([""]);
    }

    this.obtenerMaterias();
    //Para paginador
    this.initPaginator();
  }

 //Para paginación
 public initPaginator() {
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
  }, 500);
  //this.dataSourceIngresos.paginator = this.paginator;
}
//Obtener MATERIAS
public obtenerMaterias() {
  this.materiasService.obtenerListaMaterias().subscribe(
    (response) => {
      this.lista_materias = response;
      console.log("Lista Materias: ", this.lista_materias);
      if (this.lista_materias.length > 0) {

        console.log("Otro user: ", this.lista_materias);
        this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_materias as DatosUsuario[]);
      }
    }, (error) => {
      alert("No se pudo obtener la lista de usuarios");
    }
  );
}
//Las funciones para editar y eliminar solo pueden ser vistas por el administrador
//Funcion para editar
public goEditar(idUser: number) {
  //Navegar para el registro de materias y abrir el formulario para editar
  this.router.navigate(["registro-materias/" + idUser]);
}


//Funcion para eliminar una materia
public delete(idUser: number) {
  console.log("User: ", idUser);
  //Agreagar el modal para eliminar materia
  const dialogRef = this.dialog.open(EliminarMateriaModalComponent,{
    data:{id:idUser}, //Se pasan los valores a traves del componente
    height: '288px',
    width: '328px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result.isDeleted){
      console.log("Materia eliminada");
      //Recargar pagina
      window.location.reload();
    }else{
      alert("Materia no eliminada")
      console.log("Materia no eliminada");
    }
  });
}
}


//Esto va fuera de la llave que cierra la clase
export interface DatosUsuario {
  id: number,
  nrc: number;
  nombre: string;
  seccion: number;
  horaInicio: string,
  horaFin: string,
  salon: string,
  programa_educativo: string,
  dias_json: [],
}
