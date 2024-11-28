import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = '';  
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService) { }
 

  ngOnInit(): void {
    this.getUserSession();
  }

  getUserSession(){
    let token = localStorage.getItem('token')
    let decodedToken = this.jwtService.decodeToken(token);
    this.username = decodedToken.name;
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout')
  }

}


