import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FacadeService } from './facade.service';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService,
    private validatorService: ValidatorService,
    private errorService: ErrorsService
  ) { }

  public esquemaMateria() {
    return {
      'nrc': '',
      'nombre': '',
      'seccion': '',
      'dias_json': [],
      'horaInicio': '',
      'horaFin': '',
      'salon': '',
      'programa_educativo': ''
    }
  }

  public validarMateria(data: any) {
    console.log("Validando materia... ", data);
    let error: any = {};

    //NRC DE LA MATERIA
    if (!this.validatorService.required(data["nrc"])) {
      error["nrc"] = this.errorService.required;
    }
    //NOMBRE DE LA MATERIA
    if (!this.validatorService.required(data["nombre"])) {
      error["nombre"] = this.errorService.required;
    }
    //SECCION DE LA MATERIA
    if (!this.validatorService.required(data["seccion"])) {
      error["seccion"] = this.errorService.required;
    }
    //DIAS DE LA MATERIA
    if(!this.validatorService.required(data["dias_json"])){
      error["dias_json"] = "Selecciona al menos un días";
      //alert("Selecciona al menos un día");
    }
    //HORARIO DE INICIO
    if (!this.validatorService.required(data["horaInicio"])) {
      error["horaInicio"] = this.errorService.required;
    }
    //HORARIO DE FIN
    if (!this.validatorService.required(data["horaFin"])) {
      error["horaFin"] = this.errorService.required;
    }
    //SALON DE LA MATERIA
    if (!this.validatorService.required(data["salon"])) {
      error["salon"] = this.errorService.required;
    }
    //PROGRAMA EDUCATIVO
    if (!this.validatorService.required(data["programa_educativo"])) {
      error["programa_educativo"] = this.errorService.required;
    }
    //REGRESAMOS EL ARREGLO DE LOS ERRORS
    console.log("Errores: ", error);
    return error;
  }


  //Funcion para registrar una materia
  public registrarMateria(data: any): Observable<any> {
    console.log("Datos pasados: ", data);
    console.log("Dias: ",data.dias_json);
    return this.http.post<any>(`${environment.url_api}/materias/`, data, httpOptions);
  }
  //Obtener la lista de materias
  public obtenerListaMaterias(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, { headers: headers });
  }

  //Obtenemos una materia por su ID
  public getMateriaByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/materias/?id=${idUser}`, httpOptions);
  }

  //Editar la materia
  public editarMateria(data: any): Observable<any> {
    //Necesitamos asignar el token a la cabecera
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, { headers: headers });
  }

  //Servicio para eliminar una materia
  public eliminarMateria(idUser: Number): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/materias-edit/?id=${idUser}`, { headers: headers });
  }
}
