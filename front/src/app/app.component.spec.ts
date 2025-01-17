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
    // Mock Services
    mockAuthService = {} as jest.Mocked<AuthService>;

    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    mockSessionService = {
      $isLogged: jest.fn().mockReturnValue(of(true)), // Simule un utilisateur connecté
      logOut: jest.fn(),
    } as unknown as jest.Mocked<SessionService>;

    // Configure TestBed
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatToolbarModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: SessionService, useValue: mockSessionService },
      ],
    }).compileComponents();

    // Create component instance
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call sessionService.$isLogged() and return an Observable<boolean>', (done) => {
    component.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBe(true);
      expect(mockSessionService.$isLogged).toHaveBeenCalled();
      done();
    });
  });

  it('should navigate to the home page', () => {
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

    it('should display Login and Register links', () => {
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

    it('should display Session, Account and Logout links', () => {
      const links: HTMLElement[] =
        fixture.nativeElement.querySelectorAll('span.link');
      expect(links[0].textContent).toBe('Sessions');
      expect(links[1].textContent).toBe('Account');
      expect(links[2].textContent).toBe('Logout');
    });

    it('Click on logout Link should log user out and go back to site root', () => {
      const sessionServiceSpy = jest.spyOn(sessionService, 'logOut');
      const routerSpy = jest.spyOn(router, 'navigate');
      app.logout();
      expect(sessionServiceSpy).toBeCalled();
      expect(routerSpy).toBeCalledWith(['']);
    });
  });
});
