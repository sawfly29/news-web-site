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

  constructor(
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((err) => {
      if (err.status === 404 && this.checkNewsAffiliation(request.url)) {
        this.router.navigate(['/404']);
      }
      return throwError(err.error || err.statusText);
    }));
  }

  private checkNewsAffiliation(url: string): boolean {
    return url.includes('/news/');
  }
}
