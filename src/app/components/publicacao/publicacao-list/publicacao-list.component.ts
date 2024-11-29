import { PublicacaoService } from './../../../services/publicacao.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Publicacao } from 'src/app/models/publicacao';
import { StateService } from 'src/app/services/state.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PublicacaoReadDialogComponent } from '../publicacao-read-dialog/publicacao-read-dialog.component';

@Component({
  selector: 'app-publicacao-list',
  templateUrl: './publicacao-list.component.html',
  styleUrls: ['./publicacao-list.component.css']
})
export class PublicacaoListComponent implements OnInit {  
  isShowTable = false;
  isShowSpinner = false;
  ELEMENT_DATA: Publicacao[] = [];
  FILTERED_DATA: Publicacao[] = [];
  totalElements: number;
  totalPages: number;
  pageIndex = 0;
  pageSize = 5; 

  columnsToDisplay: string[] = ['orgao', 'unidade', 'localidade', 'tipo', 'numeroProcesso', 'dataPublicacao','descricao', 'acoes'];

  dataSource = new MatTableDataSource<Publicacao>(this.ELEMENT_DATA);

  queryField = new UntypedFormControl('', [Validators.maxLength(100)]);

  @ViewChild(MatPaginator) paginator: MatPaginator;  

  constructor(
    private service: PublicacaoService,
    private stateService: StateService,
    private toastService: ToastrService,
    private dialog: MatDialog,
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
 
  findAllByDescription(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }): void{   
    this.isShowTable = false; 
    this.isShowSpinner = true;
    this.service.findAllByDescription(this.queryField.value,pageEvent.pageIndex, pageEvent.pageSize).subscribe(
      response => {
        this.ELEMENT_DATA = response.publications;
        this.dataSource = new MatTableDataSource<Publicacao>(this.ELEMENT_DATA);
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;  
        this.isShowTable = true; 
        this.isShowSpinner = false; 
        if(response.totalElements === 0){
          this.toastService.info('Dados de publicações não encontrado, tente novamente.'); 
        }
      },
      error => {
        this.isShowTable = false; 
        this.isShowSpinner = false;
        this.toastService.error('Erro ao carregar publicações, tente novamente. '+error.status);           
      }
    );
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 
 
  onRead(publication: any): void {  
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.panelClass = 'custom-dialog-container';
       
    dialogConfig.data = {
        data: publication
    };

    this.dialog.open(PublicacaoReadDialogComponent, dialogConfig);
  }
}
