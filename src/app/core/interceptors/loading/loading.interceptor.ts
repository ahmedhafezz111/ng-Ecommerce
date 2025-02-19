import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const ngxSpinnerService = inject(NgxSpinnerService)

      ngxSpinnerService.show('loading-2')

  return next(req).pipe(finalize(()=>{
    ngxSpinnerService.hide('loading-2')
  }));
};
