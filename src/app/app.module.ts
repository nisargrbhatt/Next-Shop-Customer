import { environment, secureAPIURIs } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './error404/error404.component';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { AuthModule as Auth0Module } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent, Error404Component],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      audience: environment.auth0Audience,
      scope: 'read:current_user',
      httpInterceptor: {
        allowedList: [
          ...Object.values(secureAPIURIs).map((uri) => {
            let url = environment.backend_url + uri.url;
            if (uri.hasQuery) {
              url += '/*';
            }
            return url;
          }),
          environment.backend_model_url + secureAPIURIs.addActivity.url,
          environment.backend_model_url +
            secureAPIURIs.getRecommendedProducts.url,
        ],
      },
    }),
    Auth0Module,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
