import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly snackBar: MatSnackBar
  ) {
  }

  // tslint:disable-next-line:no-any
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((event: HttpErrorResponse) => {
        this.snackBar.open(event.error.message, '', {
          duration: 4000,
          panelClass: 'error-response',
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        return throwError(event);
      })
    );
  }
}
