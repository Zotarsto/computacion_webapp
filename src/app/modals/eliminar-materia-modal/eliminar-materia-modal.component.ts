import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';
@Component({
  selector: 'app-eliminar-materia-modal',
  templateUrl: './eliminar-materia-modal.component.html',
  styleUrls: ['./eliminar-materia-modal.component.scss']
})
export class EliminarMateriaModalComponent implements OnInit{

  public materia: string = "";

  constructor(
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<EliminarMateriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.materia = this.data.materia;
    console.log("Data: ", this.materia);
  }
  //Si no se quiere eliminar la materia se cierra el modal
  public cerrar_modal(){
   this.dialogRef.close({isDeleted: false});
  }

  //Si se quiere eliminar la materia se llama al servicio de materias
  public eliminarMat(){
    this.materiasService.eliminarMateria(this.data.id).subscribe(
      (response)=>{
        console.log("Materia eliminada");
        this.dialogRef.close({isDeleted: true});
      }, (error)=>{
        console.log("Error al eliminar la materia", error);
        this.dialogRef.close({isDeleted: false});
      }
    );
  }
}
