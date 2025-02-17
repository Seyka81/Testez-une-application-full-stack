import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

class MatSnackBarStub {
  open() {
    return {
      onAction: () => new Observable((obs) => obs.next()),
    };
  }
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let router: Router;

  let sessionApiService: SessionApiService;
  let snackBar: MatSnackBar;
  const now = new Date();
  const mockSessionService = {
    sessionInformation: {
      admin: true,
    },
    isLogged: true,
  };

  const mockRoute = {
    snapshot: {
      paramMap: {
        get: jest.fn(() => '1'),
      },
    },
  };

  const session1 = {
    id: '1',
    name: 'Session 9',
    description: 'Description',
    date: now,
    teacher_id: '1',
    users: [],
    createdAt: now,
    updatedAt: now,
  };

  const formSession = {
    name: 'Session 9',
    date: now.toISOString().split('T')[0],
    teacher_id: '1',
    description: 'Description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'sessions/update/:id', component: FormComponent },
          { path: 'sessions/create', component: FormComponent },
          { path: 'sessions', redirectTo: '/' },
        ]),
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        SessionApiService,
      ],
      declarations: [FormComponent],
    }).compileComponents();

    sessionApiService = TestBed.inject(SessionApiService);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Init should display session data', async () => {
    sessionApiService.detail = jest.fn(
      () => new Observable<any>((obs) => obs.next(session1))
    );
    const sessionApiServiceSpy = jest.spyOn(sessionApiService, 'detail');
    await router.navigate(['sessions', 'update', '1']);
    component.ngOnInit();
    fixture.detectChanges();
    const formElement: HTMLElement = fixture.nativeElement;
    expect(formElement.querySelector('h1')?.textContent).toBe('Update session');
  });

  it('should disable save when form is empty or not valid', async () => {
    await router.navigate(['sessions', 'create']);
    component.ngOnInit();
    fixture.detectChanges();
    const saveBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    expect(saveBtn.disabled).toBe(true);
    component.sessionForm?.setValue({
      name: 'Fake session',
      date: '',
      teacher_id: '1',
      description: 'Description',
    });
    fixture.detectChanges();
    expect(saveBtn.disabled).toBe(true);
  });

  it('Click on save should create session then exit to /sessions', async () => {
    sessionApiService.create = jest.fn(
      () => new Observable<any>((obs) => obs.next(session1))
    );
    const sessionApiServiceSpy = jest.spyOn(sessionApiService, 'create');
    const matSnackBarSpy = jest.spyOn(snackBar, 'open');
    const routerSpy = jest.spyOn(router, 'navigate');
    await router.navigate(['sessions', 'create']);
    component.ngOnInit();
    fixture.detectChanges();
    component.sessionForm?.setValue(formSession);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button[type="submit"]')?.click();
    expect(component.onUpdate).toBe(false);
    expect(sessionApiServiceSpy).toBeCalledWith(formSession);
    expect(matSnackBarSpy).toBeCalledWith('Session created !', 'Close', {
      duration: 3000,
    });
    expect(routerSpy).toBeCalledWith(['sessions']);
  });

  it('Click on save should update session then exit to /sessions', async () => {
    sessionApiService.detail = jest.fn(
      () => new Observable<any>((obs) => obs.next(session1))
    );
    sessionApiService.update = jest.fn(
      () => new Observable<any>((obs) => obs.next(session1))
    );
    const sessionApiServiceSpy = jest.spyOn(sessionApiService, 'update');
    const matSnackBarSpy = jest.spyOn(snackBar, 'open');
    const routerSpy = jest.spyOn(router, 'navigate');
    await router.navigate(['sessions', 'update', '1']);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.sessionForm?.value).toEqual(formSession);
    expect(component.onUpdate).toBe(true);
    fixture.nativeElement.querySelector('button[type="submit"]')?.click();
    expect(sessionApiServiceSpy).toBeCalledWith('1', formSession);
    expect(matSnackBarSpy).toBeCalledWith('Session updated !', 'Close', {
      duration: 3000,
    });
    expect(routerSpy).toBeCalledWith(['sessions']);
  });

  it('Init should display an empty session form', async () => {
    await router.navigate(['sessions', 'create']);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.onUpdate).toBe(false);
    expect(component.sessionForm?.value).toEqual({
      name: '',
      date: '',
      teacher_id: '',
      description: '',
    });
    const formElement: HTMLElement = fixture.nativeElement;
    expect(formElement.querySelector('h1')?.textContent).toBe('Create session');
  });
});
