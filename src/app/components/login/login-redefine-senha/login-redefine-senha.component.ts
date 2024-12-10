import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login-redefine-senha',
  templateUrl: './login-redefine-senha.component.html',
  styleUrls: ['./login-redefine-senha.component.css']
})
export class LoginRedefineSenhaComponent {

  jwtService: JwtHelperService = new JwtHelperService();

  creds: Credenciais = {
    name: '',
    email: '',
    password: '',
    passwordMatch: ''
  }

  senha = new UntypedFormControl(null, Validators.minLength(8));
  confirmaSenha = new UntypedFormControl(null, Validators.minLength(8));
  token = "";
  pwdUpdated = false;

  constructor(
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('reset');
      if (this.isValidateToken()){
        const tokenInfo = this.getDecodedAccessToken(this.token);
        this.creds.email = tokenInfo.sub;
        this.creds.name = tokenInfo.name;
        console.log("valor email = ",this.creds);
      }
    });
  }

  resetPwd(){
    if (this.checkPassword()){
      this.creds.password = this.senha.value;
      this.creds.passwordMatch = this.confirmaSenha.value;
      if(this.isValidateToken()){
        this.service.saveResetPwd(this.creds).subscribe(
          resposta => {
            this.toastService.info('Senha alterado com sucesso.');  
            this.pwdUpdated = true;                  
          },
          error => {
            this.toastService.error('Erro ao atualizar a senha.');
            this.pwdUpdated = false;  
          }          
        );
      }else{
        this.toastService.error('Sessão expirada. Solicite uma nova redefinição de senha.');
      }      
    }  
  }

  validatefields(): boolean {
    return this.senha.valid && this.confirmaSenha.valid && this.senha.value == this.confirmaSenha.value
  }

  checkPassword(){
    if (this.senha.value !== this.confirmaSenha.value) {
      this.toastService.error('As senhas não são iguais, tente novamente.');
      return false;
    }
    return true;
  }

  isValidateToken() {   
    if(this.token != null) {       
      return !this.jwtService.isTokenExpired(this.token)
    }
    return false
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  login(){
    this.router.navigate(['login']);
  }
  
}

