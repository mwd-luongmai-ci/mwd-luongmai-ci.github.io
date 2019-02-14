import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, UserService, AlertService, CustomMaterialModule } from '@app/core';
import { TestAuthenticationService } from '@app/core/services/testing/test-authentication.service';
import { TestUserService } from '@app/core/services/testing/test-user.service';
import { getTestUsers } from '@app/core/models/testing/test-users';
import { throwError } from 'rxjs';
import { generateRandomString } from '@app/shared/testing/test-util';
import { ProfileComponent } from './profile.component';
import { LoginComponent } from '@app/features/authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { SharedModule } from '@app/shared';


let component : ProfileComponent;
let fixture: ComponentFixture<ProfileComponent>;

describe('ProfileComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent, LoginComponent ],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        CustomMaterialModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent}])
      ],
      providers: [
        ProfileComponent,
        {provide: AuthenticationService, useClass : TestAuthenticationService},
        {provide: UserService, useClass : TestUserService}
        ]
    })
    .compileComponents()
    .then(createComponent);
  }));

  it('should load current profile data', () => {
    const testUser = getTestUsers()[0];
    expect(component.f.name.value).toEqual(testUser.name);
    expect(component.f.bio.value).toEqual(testUser.bio);
    expect(component.f.company.value).toEqual(testUser.company);
    expect(component.f.location.value).toEqual(testUser.location);
  });

  it('should display success message when updating profile with valid data', fakeAsync(() => {
    const testUser = getTestUsers()[0];
    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const alertServiceSpy = fixture.debugElement.injector.get(AlertService);
    const updateSpy = spyOn(userServiceSpy, 'update').and.callThrough();
    const alertSuccessSpy = spyOn(alertServiceSpy, 'success').and.callThrough();

    component.f.name.setValue(testUser.name + "Edited");
    component.f.bio.setValue(testUser.bio + "Edited");
    component.f.company.setValue(testUser.company + "Edited");
    component.f.location.setValue(testUser.location + "Edited");

    component.onSubmit();
    tick();

    expect(updateSpy.calls.any()).toBe(true, 'UserService.update should be called');
    expect(alertSuccessSpy.calls.any()).toBe(true, 'AlertService.success called');
    expect(component.loading).toBe(false, 'Loading status should be false');
    expect(component.submitted).toBe(false, 'Submitted status should be false');
  }))

  it('should not update profile with invalid data', fakeAsync(() => {
    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const updateSpy = spyOn(userServiceSpy, 'update').and.callThrough();

    component.f.name.setValue('');
    
    component.onSubmit();
    tick();

    expect(updateSpy.calls.any()).toBe(false, 'UserService.update should not be called');
    expect(component.loading).toBe(false, 'Loading status should be false');
    expect(component.submitted).toBe(true, 'Submitted status should be true');
  }))

  it('should display error message when UserService fails', fakeAsync(() => {
    const testUser = getTestUsers()[0];
    const userServiceSpy = fixture.debugElement.injector.get(UserService);
    const alertServiceSpy = fixture.debugElement.injector.get(AlertService);
    const updateSpy = spyOn(userServiceSpy, 'update').and.returnValue(throwError('UserService test failure'));
    const alertErrorSpy = spyOn(alertServiceSpy, 'error').and.callThrough();

    component.f.name.setValue(testUser.name + "Edited");
    component.f.bio.setValue(testUser.bio + "Edited");
    component.f.company.setValue(testUser.company + "Edited");
    component.f.location.setValue(testUser.location + "Edited");

    component.onSubmit();
    tick();

    expect(updateSpy.calls.any()).toBe(true, 'UserService.update should be called');
    expect(alertErrorSpy.calls.any()).toBe(true, 'AlertService.error should be called');
    expect(component.loading).toBe(false, 'Loading status should be false');
    expect(component.submitted).toBe(false, 'Submitted status should be false');
  }))

  it('should be validated when the Name value is invalid', () => {
    component.f.name.setValue('');
    expect(component.f.name.invalid).toBe(true, 'Name should be invalid with empty value');

    component.f.name.setValue(generateRandomString(100));
    expect(component.f.name.invalid).toBe(true, 'Name should be invalid with more than 50 characters');
  })

  it('should be validated when the Company value is invalid', () => {
    component.f.company.setValue('');
    expect(component.f.company.invalid).toBe(true, 'Company should be invalid with empty value');

    component.f.company.setValue(generateRandomString(100));
    expect(component.f.company.invalid).toBe(true, 'Company should be invalid with more than 50 characters');
  })

  it('should be validated when the Bio value is invalid', () => {
    component.f.bio.setValue('');
    expect(component.f.bio.invalid).toBe(true, 'Bio should be invalid with empty value');

    component.f.bio.setValue(generateRandomString(300));
    expect(component.f.bio.invalid).toBe(true, 'Bio should be invalid with more than 255 characters');
  })

  it('should be validated when the Location value is invalid', () => {
    component.f.location.setValue('');
    expect(component.f.location.invalid).toBe(true, 'Location should be invalid with empty value');

    component.f.location.setValue(generateRandomString(200));
    expect(component.f.location.invalid).toBe(true, 'Location should be invalid with more than 100 characters');
  })
});

function createComponent(){
  fixture = TestBed.createComponent(ProfileComponent);
  component = fixture.componentInstance;

  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}
