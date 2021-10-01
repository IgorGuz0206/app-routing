import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FraseDetailsResolver implements Resolve<boolean> {
  resolve(route: ActivatedRouteSnapshot): any {
    return true;
  }
}
