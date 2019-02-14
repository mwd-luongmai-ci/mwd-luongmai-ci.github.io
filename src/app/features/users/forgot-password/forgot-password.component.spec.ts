import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService, AlertService, CustomMaterialModule } from '@app/core';
import { TestUserService } from '@app/core/services/testing/test-user.service';
import { throwError } from 'rxjs';
import { generateRandomString } from '@app/shared/testing/test-util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        CustomMaterialModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        HttpClientModule
      ],
      providers: [
        ForgotPasswordComponent,
        {provide: UserService, useClass : TestUserService}]
    })
    .compileComponents()
    .then(createComponent);
  }));

  async function createComponent(){
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('should call api when submiting form', fakeAsync(() => {

    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const alertServiceSpy = fixture.debugElement.injector.get(AlertService);
    const alertSuccessSpy = spyOn(alertServiceSpy, 'success').and.callThrough();
    const forgotPasswordSpy = spyOn(userServiceSpy, 'forgotPassword').and.callThrough();

    component.f.email.setValue('test@mowede.com');
    component.onSubmit();
    tick();

    expect(forgotPasswordSpy.calls.any()).toBe(true, 'UserService.forgotPassword was NOT called although the email is valid');
    expect(alertSuccessSpy.calls.any()).toBe(true, 'AlertService.success called');
    expect(component.loading).toBe(false, 'Loading status should be false');
  }));

  it('should not call UserService api with empty email', fakeAsync(() => {
    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const alertServiceSpy = fixture.debugElement.injector.get(AlertService);
    const alertSuccessSpy = spyOn(alertServiceSpy, 'success').and.callThrough();
    const forgotPasswordSpy = spyOn(userServiceSpy, 'forgotPassword').and.callThrough();

    component.f.email.setValue('');
    component.onSubmit();
    tick();

    expect(forgotPasswordSpy.calls.any()).toBe(false, 'UserService.forgotPassword was called although the email is empty');
    expect(alertSuccessSpy.calls.any()).toBe(false, 'AlertService.success called');
    expect(component.loading).toBe(false, 'Loading status should be false');

  }));

  it('should display error message when UserService fail', fakeAsync(() => {
    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const alertServiceSpy = fixture.debugElement.injector.get(AlertService);
    const alertErrorSpy = spyOn(alertServiceSpy, 'error').and.callThrough();
    const forgotPasswordSpy = spyOn(userServiceSpy, 'forgotPassword').and.returnValue(throwError('UserService test failure'));

    component.f.email.setValue('test.mowede.com');
    component.onSubmit();
    tick();

    expect(forgotPasswordSpy.calls.any()).toBe(false, 'UserService.forgotPassword was called althouth UserService is failure');
    expect(alertErrorSpy.calls.any()).toBe(false, 'AlertService.success called');
    expect(component.loading).toBe(false, 'Loading status should be false');
  }));

  it('should be validated when the email value is invalid', () => {
    component.f.email.setValue('');
    component.onSubmit();
    expect(component.f.email.invalid).toBe(true, 'Email should be required');

    component.f.email.setValue(generateRandomString(100));
    expect(component.f.email.invalid).toBe(true, 'The email format is invalid');
  })
});
