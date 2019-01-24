import { TestAuthenticationService } from './core/services/testing/test-authentication.service';
import { AuthenticationService } from '@core/services';
import { AlertComponent } from './shared/components/alert/alert.component';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from '@app/features/authentication/login/login.component';
import { LoadingComponent } from '@app/shared/components';
import { RouterTestingModule } from '@angular/router/testing';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent, AlertComponent, LoginComponent, LoadingComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        RouterTestingModule.withRoutes([{ path: 'auth/login', component: LoginComponent}])
      ],
      providers: [
        AppComponent,
        {provide: AuthenticationService, useClass : TestAuthenticationService}]
    })
    .compileComponents()
    .then(createComponent);
  }));

  async function createComponent(){
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();
  }

  it("shoul call AppComponent.logout when clicking log out url", fakeAsync(() => {

    fixture.detectChanges();

    spyOn(component, 'logout');

    const logoutURL = fixture.debugElement.query(By.css('.nav-item.nav-link:nth-child(2)'));
    logoutURL.triggerEventHandler('click', null)

    fixture.whenStable().then(() => {
      expect(component.logout).toHaveBeenCalled();
    });
  }))

  it('shoul call AuthenticationService.logout function when logging out', fakeAsync(() => {

    const authenServiceSpy = fixture.debugElement.injector.get(AuthenticationService);
    const authenLogOut = spyOn(authenServiceSpy, 'logout').and.callThrough();
    component.logout();
    expect(authenLogOut.calls.any()).toBe(true, 'authenLogOut should be called');

  }));

});
