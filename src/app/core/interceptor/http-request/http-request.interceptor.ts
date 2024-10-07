import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../servicios/auth/auth.service';
import { inject } from '@angular/core';
import { StorageService } from '../../servicios/storage/storage.service';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(StorageService);
  if (auth.haySesion()) {
    req = req.clone({
      setHeaders : {
        Authorization : 'Bearer ' + auth.getToken()
      }
    })
  }
  return next(req);
};
