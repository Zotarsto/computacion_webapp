import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit{

  //Agregar chartjs-plugin-datalabels
  //Variables
  data: any;
  result: any;

  constructor(
    private administradoresServices: AdministradorService,
  ){}

  ngOnInit(): void {
    //Se consume la funcion getTotalUsuarios para que podamos saber cuantos usuarios se tienen desde la API
    this.administradoresServices.getTotalUsuarios().subscribe(
      //Si todo sale bien, entra al response
      (response) => {
        const { admins, maestros, alumnos } = response;
        // Verifica los valores recibidos
        console.log("Admins:", admins, "Maestros:", maestros, "Alumnos:", alumnos);
        this.result = [admins, maestros, alumnos];
        this.data = this.result.map(value => Number(value));
        console.log("Total usuarios: ", this.data);
        //Grafica de Histograma
        this.lineChartData = {
          //Se incorporan el tipo de usuario, conforme se devuelve el response desde la API
          labels: ["Administradores", "Maestros", "Alumnos"],
          datasets: [
            {
              //Se pasa la informacion de los usuarios registrados de manera dinamica
              data: this.data,
              label: 'Registro de usuarios',
              backgroundColor: '#F88406'
            }
          ]
        };

        //Grafica de Barras
        this.barChartData = {
          //Se incorporan el tipo de usuario, conforme se devuelve el response desde la API
          labels: ["Administradores", "Maestros", "Alumnos"],
          datasets: [
            {//Se pasa la informacion de los usuarios registrados de manera dinamica
              data: this.data,
              label: 'Registro de usuarios',
              backgroundColor: [
                '#F88406',
                '#FCFF44',
                '#82D3FB',
                '#FB82F5',
                '#2AD84A'
              ]
            }
          ]
        };
        //Grafica circular
        this.pieChartData = {
          //Se incorporan el tipo de usuario, conforme se devuelve el response desde la API
          labels: ["Administradores", "Maestros", "Alumnos"],
          datasets: [
            {//Se pasa la informacion de los usuarios registrados de manera dinamica
              data: this.data,
              backgroundColor: [
                '#FCFF44',
                '#F1C8F2',
                '#31E731'
              ]
            }
          ]
        };
        // Doughnut
        this.doughnutChartData = {
          labels: ["Administradores", "Maestros", "Alumnos"],
          //Se incorporan el tipo de usuario, conforme se devuelve el response desde la API
          datasets: [
            {//Se pasa la informacion de los usuarios registrados de manera dinamica,
              data: this.data,
              backgroundColor: [
                '#F88406',
                '#FCFF44',
                '#31E7E7'
              ]
            }
          ]
        };

      },
      (error) => {//En caso no entre al response, se mostrara un alert para avisar que obtuvo a los usuarios
        alert("No se pudo obtener el total de cada rol de usuarios");
      }
    );
  }

  //Variable qu see utilizarán para almacenar los datos del gráfico y su configuracion

  //Histograma
  lineChartData: any;
  lineChartOption = {
    responsive:false
  }
  lineChartPlugins = [ DatalabelsPlugin ];

  //Barras
  barChartData: any;
    // Declarar barChartData fuera del bloque de ngOnInit
  barChartOption = {
    responsive: false
  };
  barChartPlugins = [ DatalabelsPlugin ];

  //circular
  pieChartData: any;
  pieChartOption = {
    responsive:false
  }
  pieChartPlugins = [ DatalabelsPlugin ];

  //Doughnut
  doughnutChartData: any;
  doughnutChartOption = {
    responsive:false
  }
  doughnutChartPlugins = [ DatalabelsPlugin ];

}
