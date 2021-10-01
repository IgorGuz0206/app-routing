import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false
  redirectUrl!: string

  constructor() { }

  login(login: string, password: string): Observable<boolean> {
    // Var 3 Observable
    const observable = of({login: 'admin', password: '123'}).pipe(delay(3000))

    return observable.pipe(map(res => login === res.login && password === res.password ? this.isLoggedIn = true : false))

    // Var 2 Promise
    // const promise = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       login: 'admin',
    //       password: '123'
    //     })
    //   }, 3000)
    // })

    // return promise.then((res: any) => {
    //   return login === res.login && password === res.password ? this.isLoggedIn = true : false
    // })


    // Var #1
    // return login ==='admin' && password === '123' ? this.isLoggedIn = true : false
  }

  logout(): void {
    this.isLoggedIn = false
  }
}
