import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-materia-modal',
  templateUrl: './modificar-materia-modal.component.html',
  styleUrls: ['./modificar-materia-modal.component.scss']
})
export class ModificarMateriaModalComponent {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModificarMateriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  //Si no se quiere eliminar entonces se cierra el modal y se regresa a la vista home
  public cerrar_modal(){
    this.dialogRef.close({isDeleted: false});
    //No se si aqui se regresa o no
    this.router.navigate(['/home']);
  }

  //Si se quiere modificar entonces se llama al servicio de materias
  public modificar(){
    //Que regrese a la funcion de actualizar de registro-materias.component.ts
    this.dialogRef.close({isDeleted: false});
  }

}
