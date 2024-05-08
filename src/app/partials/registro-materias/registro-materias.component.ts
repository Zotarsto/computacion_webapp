import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';

declare var $: any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit {

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public tipo:string = "registro-mataria";

  public materia:any= {};
  public valoresCheckbox: any = [];
  public errors: any = {};
  public idMateria: Number = 0;
  public editar: boolean = false;
  public dias_json: any[] = [];

  //Dias
  public dias: any[] = [
    { value: '1', nombre: 'Lunes' },
    { value: '2', nombre: 'Martes' },
    { value: '3', nombre: 'Miercoles' },
    { value: '4', nombre: 'Jueves' },
    { value: '5', nombre: 'Viernes' },
    { value: '6', nombre: 'Sabado' },
    ];

  //Programa Educativo
  public programas: any[] = [
    { value: '1', viewValue: 'Ingeniería en Ciencias de la Computación' },
    { value: '2', viewValue: 'Licenciatura en Ingenieria en Ciencias de la Computación' },
    { value: '3', viewValue: 'Ingeniería en Tecnologías de la Información' },
  ];

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private materiasService: MateriasService,
    private facadeService: FacadeService,
    private dialog: MatDialog
  ){}

  ngOnInit(){

  }


  //Funciones para checkbox
  public checkboxChange(event: any) {
    if (event.checked) {
      this.materia.materias_json.push(event.source.value)
    } else {
      console.log(event.source.value);
      this.materia.materias_json.forEach((materia, i) => {
        if (materia == event.source.value) {
          this.materia.materias_json.splice(i, 1)
        }
      });
    }
    console.log("Array materias: ", this.materia);
  }

  public revisarSeleccion(nombre: string) {
    //Parsear dias_json de nuevo a un arreglo si es una cadena JSON
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

  //Funcion para select
  public changeSelect(event : any){
    console.log(event);
    this.materia.programas_json = event.value;
  }

  public regresar (){

  }
  public actualizar (){

  }
  public registrar(){

  }

}
