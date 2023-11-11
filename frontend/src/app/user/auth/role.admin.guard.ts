import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleAdminGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable<boolean>((observer) => {
      this.authService.isAdmin().subscribe({
        next: (response) => {
          // console.log({ response });
          // if authenticated the backend responses with the user object
          // trigger the true authentication status
          observer.next(true);
        },
        error: (response) => {
          // if not authenticated response with false
          // trigger the false authentication status
          if (response.status === 403 || response.status === 401) {
            // navigae to the home page
            this.router.navigateByUrl('/');

            observer.next(false);

            // prompt the login modal with error message
          }
        },
      });
    });
  }
}
