import { ResetPasswordComponent } from './reset-password.component';
import { LoginComponent } from '@app/features/authentication/login/login.component';
import { PasswordComponent, LoadingComponent } from '@app/shared/components';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService, AlertService } from '@app/core';
import { TestUserService } from '@app/core/services/testing/test-user.service';
import { throwError } from 'rxjs';
import { generateRandomString } from '@app/shared/testing/test-util';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent, PasswordComponent, LoginComponent, LoadingComponent],
      imports: [
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent}])
      ],
      providers: [
        ResetPasswordComponent,
        {provide: UserService, useClass : TestUserService}]
    })
    .compileComponents()
    .then(createComponent);
  }));

  async function createComponent(){
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('should call api when submiting form', fakeAsync(() => {

    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const alertServiceSpy = fixture.debugElement.injector.get(AlertService);
    const alertSuccessSpy = spyOn(alertServiceSpy, 'success').and.callThrough();
    const resetPasswordSpy = spyOn(userServiceSpy, 'resetPassword').and.callThrough();

    component.f.password.setValue('admin123');
    component.onSubmit();
    tick();

    expect(resetPasswordSpy.calls.any()).toBe(true, 'UserService.resetPassword should be called');
    expect(alertSuccessSpy.calls.any()).toBe(true, 'AlertService.success should be called');
  }));

  it('should not call UserService api with empty password', fakeAsync(() => {
    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const alertServiceSpy = fixture.debugElement.injector.get(AlertService);
    const alertSuccessSpy = spyOn(alertServiceSpy, 'success').and.callThrough();
    const resetPasswordSpy = spyOn(userServiceSpy, 'resetPassword').and.callThrough();

    component.f.password.setValue('');
    component.onSubmit();
    tick();

    expect(resetPasswordSpy.calls.any()).toBe(false, 'UserService.resetPassword should be not called');
    expect(alertSuccessSpy.calls.any()).toBe(false, 'AlertService.success should be not called');
    expect(component.loading).toBe(false, 'Loading status should be false');

  }));

  it('should display error message when UserService fail', fakeAsync(() => {
    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const alertServiceSpy = fixture.debugElement.injector.get(AlertService);
    const alertErrorSpy = spyOn(alertServiceSpy, 'error').and.callThrough();
    const resetPasswordSpy = spyOn(userServiceSpy, 'forgotPassword').and.returnValue(throwError('UserService test failure'));

    component.f.password.setValue('admin123');
    component.onSubmit();
    tick();

    expect(resetPasswordSpy.calls.any()).toBe(false, 'UserService.resetPassword should be not called');
    expect(alertErrorSpy.calls.any()).toBe(false, 'AlertService.error should be not called');
  }));

  it('should be validated when the password value is invalid', () => {
    component.f.password.setValue('');
    component.onSubmit();
    expect(component.f.password.invalid).toBe(true, 'password should be required');

    component.f.password.setValue(generateRandomString(7));
    expect(component.f.password.invalid).toBe(true, 'Minimum length of password is 8 characters');

    component.f.password.setValue('adminmowede');
    expect(component.f.password.invalid).toBe(true, 'The password must contain at least one non-alphabetic character');

    const invalidPassword = 'abc123456789';
    component.f.password.setValue(invalidPassword);
    expect(component.f.password.invalid).toBe(true, 'The password must contain at least four alphabetic characters');

  })
});
