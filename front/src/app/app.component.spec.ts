import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { of } from 'rxjs';
import { AuthService } from './features/auth/services/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRouter: jest.Mocked<Router>;
  let mockSessionService: jest.Mocked<SessionService>;

  beforeEach(async () => {
    mockAuthService = {} as jest.Mocked<AuthService>;

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    mockSessionService = {
      $isLogged: jest.fn().mockReturnValue(of(true)),
      logOut: jest.fn(),
    } as unknown as jest.Mocked<SessionService>;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatToolbarModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionService, useValue: mockSessionService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should call sessionService.$isLogged()', (done) => {
    component.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBe(true);
      expect(mockSessionService.$isLogged).toHaveBeenCalled();
      done();
    });
  });

  it('Should navigate to the home page', () => {
    component.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });
});

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let sessionService: SessionService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatToolbarModule],
      declarations: [AppComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
    sessionService = TestBed.inject(SessionService);
  });

  describe(' when not logged', () => {
    beforeEach(async () => {
      sessionService.$isLogged = jest.fn(
        () => new Observable((obs) => obs.next(false))
      );
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display Login and Register', () => {
      const links: HTMLElement[] =
        fixture.nativeElement.querySelectorAll('span.link');
      expect(links[0].textContent).toBe('Login');
      expect(links[1].textContent).toBe('Register');
    });
  });

  describe(' when logged', () => {
    beforeEach(async () => {
      sessionService.$isLogged = jest.fn(
        () => new Observable((obs) => obs.next(true))
      );
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display some links', () => {
      const links: HTMLElement[] =
        fixture.nativeElement.querySelectorAll('span.link');
      expect(links[0].textContent).toBe('Sessions');
      expect(links[2].textContent).toBe('Logout');
      expect(links[1].textContent).toBe('Account');
    });

    it('Click on logout link should log out', () => {
      const sessionServiceSpy = jest.spyOn(sessionService, 'logOut');
      const routerSpy = jest.spyOn(router, 'navigate');
      app.logout();
      expect(sessionServiceSpy).toBeCalled();
      expect(routerSpy).toBeCalledWith(['']);
    });
  });
});
