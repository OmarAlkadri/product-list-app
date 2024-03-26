import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { provideToastr } from 'ngx-toastr';
//import { reducers } from './ngrx/index';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientModule,
      MatNativeDateModule,
      FormsModule
    ),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  //  provideStore(reducers),

    provideAnimationsAsync(),
  ]
};