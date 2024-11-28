import { Publicacao } from 'src/app/models/publicacao';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicacaoService } from 'src/app/services/publicacao.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-publicacao-read',
  templateUrl: './publicacao-read.component.html',
  styleUrls: ['./publicacao-read.component.css']
})

export class PublicacaoReadComponent implements OnInit {

  publicacao: Publicacao = {
    orgao:      '',
    unidade:      '',
    localidade: '',
    tipo:     '',
    numeroProcesso:     '',
    descricao: '',
    documento: '',
    dataPublicacao: '',
  } 

  constructor(
    private publicacaoService: PublicacaoService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
    private location: Location,   
    private dialogRef: MatDialogRef<PublicacaoReadComponent>,
    @Inject(MatDialog) data 
  ) { this.publicacao.id = data.id; }

  ngOnInit(): void { 
     this.publicacao.id = this.route.snapshot.paramMap.get('id');
     this.findById();
  }

  findById(): void {
    this.publicacaoService.findById(this.publicacao.id).subscribe(resposta => {
      this.publicacao = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }   
 
  onCancel() {
    this.location.back();   
  }
}
