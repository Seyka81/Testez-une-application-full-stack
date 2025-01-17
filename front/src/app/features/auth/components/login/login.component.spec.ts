import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: Router;
  let mockSessionService: jest.Mocked<SessionService>;
  let mockAuthService: jest.Mocked<AuthService>;

  const mockSessionInformation: SessionInformation = {
    token: '',
    type: '',
    id: 1,
    username: '',
    firstName: '',
    lastName: '',
    admin: true,
  };

  mockRouter = {
    navigate: jest.fn(),
  } as unknown as jest.Mocked<Router>;

  mockAuthService = {
    login: jest.fn().mockReturnValue(of(undefined)),
  } as unknown as jest.Mocked<AuthService>;

  mockSessionService = {
    logIn: jest.fn().mockReturnValue(of(mockSessionInformation)),
  } as unknown as jest.Mocked<SessionService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockRouter = TestBed.inject(Router);
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('invokes AuthService.login on submit', () => {
    const loginSpy = jest
      .spyOn(mockAuthService, 'login')
      .mockReturnValue(of({} as SessionInformation));
    component.submit();
    expect(loginSpy).toHaveBeenCalled;
  });

  it('invokes sessionService.logIn on submit', () => {
    const logInSpy = jest
      .spyOn(mockSessionService, 'logIn')
      .mockImplementation(() => {});
    component.submit();
    expect(logInSpy).toHaveBeenCalled;
  });

  it('navigates to /sessions on submit', () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');
    component.submit();
    expect(navigateSpy).toHaveBeenCalledWith(['/sessions']);
  });

  it('sets onError true if login fails', () => {
    const error = new Error();
    const errorSpy = jest
      .spyOn(mockAuthService, 'login')
      .mockReturnValueOnce(throwError(error));
    component.submit();
    expect(errorSpy).toHaveBeenCalled;
    expect(component.onError).toBeTruthy();
  });
});
