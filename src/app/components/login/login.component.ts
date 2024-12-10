import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import { LoginEsqueceuSenhaDialogComponent } from './login-esqueceu-senha-dialog/login-esqueceu-senha-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    name: '',
    email: '',
    password: '',
    passwordMatch: ''
  }

  nome = new UntypedFormControl(null, Validators.maxLength(60));
  email = new UntypedFormControl(null, Validators.email);
  senha = new UntypedFormControl(null, Validators.minLength(8));
  confirmaSenha = new UntypedFormControl(null, Validators.minLength(8));
  isNewUser: boolean = false;

  constructor(
    private toastService: ToastrService,
    private service: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {}

  login() {
    if (!this.isNewUser){      
        this.service.authenticate(this.creds).subscribe(resposta => {
          this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));
          this.router.navigate([''])
        }, () => {          
          this.toastService.error('Usuário e/ou senha inválidos.');
        })          
    } else {
      if (this.checkPassword()){
        this.service.save(this.creds).subscribe(
          resposta => {
            if (resposta.status === 201 ) {
              this.toastService.success('Usuário criado com sucesso');
              this.isNewUser = false;
            }
          },
          erro => {
            this.isNewUser = true;
            if (erro.status === 409) {
              this.toastService.error('Email já cadastrado, tente novamente.'+erro.status);
            } else {
              this.toastService.error('Erro ao criar usuário, tente novamente.'+erro.status);
            }
          }
        );
      }  
    }
   
  }

  validatefields(): boolean {
    if(this.isNewUser){
      return this.email.valid && this.senha.valid && this.nome.valid && this.senha.valid && this.confirmaSenha.valid 
    }
    return this.email.valid && this.senha.valid
  }

  checkPassword(){
    if (this.senha.value !== this.confirmaSenha.value) {
      this.toastService.error('As senhas não são iguais, tente novamente.');
      return false;
    }
    return true;
  }

  subscribeNewUser(param: any): void{    
    this.isNewUser = param;
  }

  resetPassword() {  
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(LoginEsqueceuSenhaDialogComponent, dialogConfig);
  }
}
