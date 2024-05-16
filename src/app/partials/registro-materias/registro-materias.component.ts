import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';
import { MatDialog } from '@angular/material/dialog';
import { ModificarMateriaModalComponent } from 'src/app/modals/modificar-materia-modal/modificar-materia-modal.component';


//Para poder usar jquery definir esto
declare var $: any;
@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit {
  //Ahora los datos de la materia
  public materia: any = {};
  public errors: any = {};
  public idMateria: Number = 0;
  public editar: boolean = false;
  //Checkbox
  public valoresCheckbox: any = [];
  public dias_json: any[] = [];


  public programas: any[] = [
    { value: '1', viewValue: 'Ingeniería en Ciencias de la Computación' },
    { value: '2', viewValue: 'Licenciatura en Ciencias de la Computacion' },
    { value: '3', viewValue: 'Ingeneria en Tecnologias de la Información' },
  ];
  //Valores de los dias
  public dias: any[] = [
    { value: '1', nombre: 'Lunes' },
    { value: '2', nombre: 'Martes' },
    { value: '3', nombre: 'Miercoles' },
    { value: '4', nombre: 'Jueves' },
    { value: '5', nombre: 'Viernes' },
    { value: '6', nombre: 'Sabado' }
  ];

  constructor(
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private materiasService: MateriasService,
    private facadeService: FacadeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL es decir si existe ya una materia
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true; //Ahora el editar es verdadero quiere decir que puede actualizar
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idMateria);
      //Al iniciar la vista asignamos los datos de la materia
      this.materiasService.getMateriaByID(this.idMateria).subscribe(
        (response) => {
          this.materia = response;
        },
        (error) => {
          alert("No se pudieron obtener los detalles de la materia para editar");
          console.error("Error al obtener los detalles de la materia: ", error);
        }
      );
      //Si no existe un id de materia entonces se crea una nueva
    } else {
      this.materia = this.materiasService.esquemaMateria();
      console.log("MATERIA: ", this.materia);
    }
  }

  //Funcion para registrar
  public registrar() {
    //Validar
    this.errors = [];
    //Se manda a llamar al servicio y se asigna a la variable errors para ver si esta vacia
    this.errors = this.materiasService.validarMateria(this.materia);
    if (!$.isEmptyObject(this.errors)) {
      //Si no esta vacia entonces no se puede registrar
      return false;
    }
    //Convertimos los dia a cadena json
    this.materia.dias_json = JSON.stringify(this.materia.dias_json);
    //Si esta vacio entonces se manda a llamar al servicio para registrar la materia
    console.log("Datos a enviar: ", this.materia);
    this.materiasService.registrarMateria(this.materia).subscribe(
      (response) => {
        alert("Materia registrada correctamente");
        console.log("Materia registrado: ", response);
        this.router.navigate(["home"]);
      }, (error) => {
        console.log("Error: ", error);
        alert("No se pudo registrar materia");
      }
    )
  }

  //Regresar a la pagina anterior
  public regresar() {
    this.location.back();
  }


  public checkboxChange(event: any) {
    if (!this.materia.dias_json) {
      this.materia.dias_json = []; // Inicializar this.materia.dias_json si aún no está definida
    }
    if (event.checked) {
      this.materia.dias_json.push(event.source.value);
    } else {
      console.log(event.source.value);
      this.materia.dias_json.forEach((dia, i) => {
        if (dia == event.source.value) {
          this.materia.dias_json.splice(i, 1);
        }
      });
    }
    console.log("Array días: ", this.materia);
  }


  public revisarSeleccion(nombre: string) {
    if (typeof this.materia.dias_json === 'string') {
      this.materia.dias_json = JSON.parse(this.materia.dias_json);
    }
    //Ahora si podemos interactuar
    if (this.materia.dias_json) {
      var busqueda = this.materia.dias_json.find((element) => element == nombre);
      if (busqueda != undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public actualizar() {
    const dialogRef = this.dialog.open(ModificarMateriaModalComponent, {
      data: { id: this.materia.idMateria }, //Se pasan los valores a traves del componente
      height: '288px',
      width: '328px',
    });
    dialogRef.afterClosed().subscribe(result => {
      //Validación con el servicio
      this.errors = [];
      this.errors = this.materiasService.validarMateria(this.materia);
      if (!$.isEmptyObject(this.errors)) {
        console.log("No paso la validacion");
        return false;
      }
      console.log("Pasó la validación");

      this.materiasService.editarMateria(this.materia).subscribe(
        (response) => {
          //alert("Materia editada correctamente");
          console.log("Materia editada: ", response);
          //Si se editó, entonces mandar al home
          this.router.navigate(["home"]);
        }, (error) => {
          console.error("Error al editar la materia: ", error);
          //alert("No se pudo editar la materia");
        }
      );
    });

  }
}
