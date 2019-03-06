import { CoreModule, CustomMaterialModule } from '@app/core';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersModule } from './features/users/users.module';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // core & shared
    CoreModule,
    SharedModule,
    UsersModule,
    CustomMaterialModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [ { provide: LOCALE_ID, useValue: ['en','fr','ja'] } ],
  bootstrap: [AppComponent]
})

export class AppModule { }
