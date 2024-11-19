import { PublicacaoService } from './../../../services/publicacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Publicacao } from 'src/app/models/publicacao';
import { StateService } from 'src/app/services/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-publicacao-list',
  templateUrl: './publicacao-list.component.html',
  styleUrls: ['./publicacao-list.component.css']
})
export class PublicacaoListComponent implements OnInit {  
  isDataLoaded = false;
  ELEMENT_DATA: Publicacao[] = [];
  FILTERED_DATA: Publicacao[] = [];
  totalElements: number;
  totalPages: number;
  pageIndex = 0;
  pageSize = 10; 

  columnsToDisplay: string[] = ['id', 'orgao', 'unidade', 'localidade', 'tipo', 'numeroProcesso', 'dataPublicacao','descricao', 'acoes'];

  dataSource = new MatTableDataSource<Publicacao>(this.ELEMENT_DATA);

  queryField = new UntypedFormControl('', [Validators.maxLength(100)]);

  @ViewChild(MatPaginator) paginator: MatPaginator;  

  constructor(
    private service: PublicacaoService,
    private stateService: StateService,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    const state = this.stateService.getState();    
    if (state.query !== ''){
      this.pageIndex = state.pageIndex;
      this.pageSize = state.pageSize;
      this.queryField.setValue(state.query);

      this.findAllByDescription({
        length: 0,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
    }       
  }
 
  findAllByDescription(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }): void{   
    this.service.findAllByDescription(this.queryField.value,pageEvent.pageIndex, pageEvent.pageSize).subscribe(
      resposta => {
        this.ELEMENT_DATA = resposta.publications;
        this.dataSource = new MatTableDataSource<Publicacao>(this.ELEMENT_DATA);
        this.totalElements = resposta.totalElements;
        this.totalPages = resposta.totalPages;
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
        this.isDataLoaded = true;    
        if(resposta.totalElements === 0){
          this.isDataLoaded = false;
          this.toastService.info('Dados de publicações não encontrado, tente novamente.'); 
        }
      },
      erro => {
        this.isDataLoaded = false; 
        this.toastService.error('Erro ao carregar publicações, tente novamente.'+erro.status);           
      }
    );
  }  

  /* loadPublications(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }): void { 
      this.service.findAll(pageEvent.pageIndex, pageEvent.pageSize).subscribe(
        resposta => {  
          this.ELEMENT_DATA = resposta.publications; // Acesse o array de publicações diretamente
          this.dataSource = new MatTableDataSource<Publicacao>(this.ELEMENT_DATA);
          this.totalElements = resposta.totalElements; // Armazena o total de elementos
          this.totalPages = resposta.totalPages; // Armazena o total de páginas
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
          // this.dataSource.paginator = this.paginator;
        },
        error => {
          console.error("Erro ao carregar publicações: ", error);
        }
      );
  }   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 
 
  onRead(): void {
    this.stateService.setState({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      query: this.queryField.value,
    });    
  }
}
