import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '@app/core';
import { InputComponent } from './components/input/input.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ChangeThemeComponent } from './components/change-theme/change-theme.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingComponent,
    InputComponent,
    ValidationMessagesComponent,
    ChangeThemeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FormsModule
  ],
  exports: [
    AlertComponent,
    LoadingComponent,
    CustomMaterialModule,
    InputComponent,
    ValidationMessagesComponent,
    ChangeThemeComponent
  ]
})
export class SharedModule { }
