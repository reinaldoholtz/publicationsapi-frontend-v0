import { PublicacaoService } from './../../../services/publicacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Publicacao } from 'src/app/models/publicacao';

@Component({
  selector: 'app-publicacao-list',
  templateUrl: './publicacao-list.component.html',
  styleUrls: ['./publicacao-list.component.css']
})
export class PublicacaoListComponent implements OnInit {

  ELEMENT_DATA: Publicacao[] = []
  FILTERED_DATA: Publicacao[] = []

  displayedColumns: string[] = ['id', 'orgao', 'unidade', 'localidade', 'tipo', 'numeroProcesso', 'dataPublicacao','descricao', 'acoes'];

  dataSource = new MatTableDataSource<Publicacao>(this.ELEMENT_DATA);

  queryField = new UntypedFormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: PublicacaoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Publicacao>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  findAllByDescricao(): void{  
    console.log("findAllByDescricao VALOR this.queryField.value = ",this.queryField.value);
    this.service.findAllByDescricao(this.queryField.value).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Publicacao>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
