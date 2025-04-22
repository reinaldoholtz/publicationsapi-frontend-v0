import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Publicacao } from 'src/app/models/publicacao';

@Component({
  selector: 'app-publicacao-read-dialog',
  templateUrl: './publicacao-read-dialog.component.html',
  styleUrls: ['./publicacao-read-dialog.component.css']
})
export class PublicacaoReadDialogComponent {
  
  publicacao: Publicacao = {
    codigo:              '',
    idMateria:           '',
    idArquivo:           '',
    processo:            '',
    partes:              '',
    termos:              '',
    justica:             '',
    estado:              '',
    forum:               '',
    pagina:              '',
    diario:              '',
    dataProcessamento:   '',
    dataDiario:          '',
    texto:               '',
    documento:           '',
   }   

  constructor(
      private dialogRef: MatDialogRef<PublicacaoReadDialogComponent>,
      @Inject(MAT_DIALOG_DATA) pub) 
  {
      this.publicacao = pub.data;
  }

  close() {
      this.dialogRef.close();
  }
}
