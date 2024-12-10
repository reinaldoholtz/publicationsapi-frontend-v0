import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-esqueceu-senha-dialog',
  templateUrl: './login-esqueceu-senha-dialog.component.html',
  styleUrls: ['./login-esqueceu-senha-dialog.component.css']
})
export class LoginEsqueceuSenhaDialogComponent {
  emailModel : String;
  isEmailNotFound: boolean = true;

  emailControl = new UntypedFormControl(null, Validators.email);

  constructor(
    private dialogRef: MatDialogRef<LoginEsqueceuSenhaDialogComponent>,
    private service: AuthService,
    private toastService: ToastrService
  ){}

  checkEmail(){
    console.log("valor email = ",this.emailModel);
    this.service.findByEmail(this.emailModel).subscribe(
      resposta => {
        this.isEmailNotFound = false;
        this.toastService.info('Link de redefinição de senha enviado para seu e-mail.');        
      },
      error => {
        this.toastService.error('Email não encontrado!!!');
        this.isEmailNotFound = true;
      }
    );
  } 
  
  validatefield(): boolean {
    return this.emailControl.valid;
  }

  close() {
    this.dialogRef.close();
  }

}
