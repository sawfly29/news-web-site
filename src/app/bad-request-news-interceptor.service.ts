import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BadRequestNewsInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  // eslint-disable-next-line
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 400 && this.checkNewsAffilation(request.url)) {
          this.router.navigate(['/404']);
        }
        return throwError(err.error || err.statusText);
      })
    );
  }

  private checkNewsAffilation(url: string): boolean {
    return url.includes('api/news/item/avto-novosti');
  }
}
