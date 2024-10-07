import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { StorageService } from '../../servicios/storage/storage.service';
import { Router } from '@angular/router';

export const httpTokenOutdatedInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(tap((event) => {
    if (event.type == (HttpEventType.Response || HttpEventType.ResponseHeader) && event.status == 403) {
      const storage = inject(StorageService);
      if (storage.haySesion()) storage.removeToken();
      inject(Router).navigate(['/login']);
    }
  }));
};
