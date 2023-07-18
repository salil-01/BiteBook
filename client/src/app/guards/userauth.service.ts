import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserauthService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // handling logic for private routing
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isUser() || this.authService.isAdmin()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
