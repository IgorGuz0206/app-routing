import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin = 'admin'
  userPassword = '123'
  message!: string

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setMessage()
  }

  login(): void {
    this.message = 'Trying to log in...'
   this.authService.login(this.userLogin, this.userPassword).subscribe(res => {
      this.setMessage()
      if (!this.authService.isLoggedIn) return
      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin'
      this.router.navigate([redirect]).then()
     })

      // Var 2 Promise
  //  this.authService.login(this.userLogin, this.userPassword).then(res => {
  //   this.setMessage()
  //   if (!this.authService.isLoggedIn) return
  //   const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin'
  //   this.router.navigate([redirect]).then()
  //  })
  }

  logout(): void {
    this.authService.logout()
    this.setMessage()
  }

  private setMessage(): void {
    this.message = `Logged ${this.authService.isLoggedIn ? 'in' : 'out'}`
  }

}
