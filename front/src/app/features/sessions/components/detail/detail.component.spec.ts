import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { Observable } from 'rxjs';

import { SessionService } from '../../../../services/session.service';
import { DetailComponent } from './detail.component';
import { SessionApiService } from '../../services/session-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

class MatSnackBarStub {
  open() {
    return {
      onAction: () => new Observable((obs) => obs.next()),
    };
  }
}

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let sessionApiService: SessionApiService;
  let teacherService: TeacherService;
  let router: Router;
  let snackBar: MatSnackBar;

  const dateTest1 = new Date(2025, 0, 14);
  const dateTestString1 = 'January 14, 2025';
  const dateTest2 = new Date(2025, 0, 17);
  const dateTestString2 = 'January 17, 2025';
  const dateTest3 = new Date(2025, 0, 19);
  const dateTestString3 = 'January 19, 2025';

  const teacher = {
    id: 1,
    lastName: 'Margot',
    firstName: 'DELAHAYE',
    createdAt: dateTest1,
    updatedAt: dateTest1,
  };

  describe('DetailComponent as user', () => {
    const mockSessionService = {
      sessionInformation: {
        admin: false,
        id: 5,
      },
    };

    const mockRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn(() => '3'),
        },
      },
    };

    const sessionDeTest2 = {
      id: 3,
      name: 'A new relax session',
      description: 'yoga session',
      date: dateTest3,
      teacher_id: 1,
      users: [1, 2, 3, 4],
      createdAt: dateTest1,
      updatedAt: dateTest2,
    };

    const sessionDeTest3 = {
      id: 3,
      name: 'A last relax session',
      description: 'Une session de test',
      date: dateTest3,
      teacher_id: 1,
      users: [1, 2, 3, 4, 5],
      createdAt: dateTest1,
      updatedAt: dateTest2,
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientModule,
          MatIconModule,
          MatCardModule,
          MatSnackBarModule,
          ReactiveFormsModule,
        ],
        declarations: [DetailComponent],
        providers: [
          { provide: SessionService, useValue: mockSessionService },
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: MatSnackBar, useClass: MatSnackBarStub },
          { provide: Router, useValue: { navigate: jest.fn() } },
        ],
      }).compileComponents();
      sessionApiService = TestBed.inject(SessionApiService);
      sessionApiService.detail = jest.fn(
        () => new Observable((obs) => obs.next(sessionDeTest2))
      );
      teacherService = TestBed.inject(TeacherService);
      teacherService.detail = jest.fn(
        () => new Observable((obs) => obs.next(teacher))
      );
      router = TestBed.inject(Router);
      snackBar = TestBed.inject(MatSnackBar);
      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display the yoga session informations at initialization', () => {
      const detailElement: HTMLElement = fixture.nativeElement;
      expect(detailElement.querySelector('h1')?.textContent).toContain(
        'A New Relax Session'
      );
      expect(
        detailElement.querySelector('div.description')?.textContent
      ).toContain(sessionDeTest2.description);
      expect(detailElement.querySelector('div.created')?.textContent).toContain(
        dateTestString1
      );
      expect(detailElement.textContent).toContain(
        teacher.firstName + ' ' + teacher.lastName.toUpperCase()
      );
    });

    it('Click on participate button should add the user to the yoga session', () => {
      sessionApiService.participate = jest.fn(
        () => new Observable((obs) => obs.next())
      );
      const sessionApiSpy = jest.spyOn(sessionApiService, 'participate');
      const participateBtn: HTMLButtonElement =
        fixture.nativeElement.querySelectorAll('button')[1];
      participateBtn?.click();
      expect(sessionApiSpy).toBeCalledWith('3', '5');
    });

    it('Click on participate button should remove the user from the yoga session', () => {
      sessionApiService.detail = jest.fn(
        () => new Observable((obs) => obs.next(sessionDeTest3))
      );
      component.ngOnInit();
      fixture.detectChanges();
      sessionApiService.unParticipate = jest.fn(
        () => new Observable((obs) => obs.next())
      );
      const sessionApiSpy = jest.spyOn(sessionApiService, 'unParticipate');
      const unparticipateBtn: HTMLButtonElement =
        fixture.nativeElement.querySelectorAll('button')[1];
      unparticipateBtn?.click();
      expect(sessionApiSpy).toBeCalledWith('3', '5');
    });
  });
  describe('as admin', () => {
    const mockSessionService = {
      sessionInformation: {
        admin: true,
        id: 1,
      },
    };

    const mockRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn(() => '2'),
        },
      },
    };

    const sessionDeTest1 = {
      id: 2,
      name: 'Relax With Yoga',
      description: 'A relaxing yoga session',
      date: dateTest3,
      teacher_id: 1,
      users: [1, 2, 3, 4],
      createdAt: dateTest1,
      updatedAt: dateTest2,
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientModule,
          MatIconModule,
          MatCardModule,
          MatSnackBarModule,
          ReactiveFormsModule,
        ],
        declarations: [DetailComponent],
        providers: [
          { provide: SessionService, useValue: mockSessionService },
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: MatSnackBar, useClass: MatSnackBarStub },
          { provide: Router, useValue: { navigate: jest.fn() } },
        ],
      }).compileComponents();
      sessionApiService = TestBed.inject(SessionApiService);
      sessionApiService.detail = jest.fn(
        () => new Observable((obs) => obs.next(sessionDeTest1))
      );
      teacherService = TestBed.inject(TeacherService);
      teacherService.detail = jest.fn(
        () => new Observable((obs) => obs.next(teacher))
      );
      router = TestBed.inject(Router);
      snackBar = TestBed.inject(MatSnackBar);
      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display the yoga session infos', () => {
      const detailElement: HTMLElement = fixture.nativeElement;
      expect(detailElement.querySelector('h1')?.textContent).toContain(
        'Relax With Yoga'
      );
      expect(
        detailElement.querySelector('div.description')?.textContent
      ).toContain(sessionDeTest1.description);
      expect(detailElement.querySelector('div.created')?.textContent).toContain(
        dateTestString1
      );
      expect(detailElement.querySelector('div.updated')?.textContent).toContain(
        dateTestString2
      );
      expect(detailElement.textContent).toContain(dateTestString3);
      expect(detailElement.textContent).toContain(
        sessionDeTest1.users.length + ' attendees'
      );
      expect(detailElement.textContent).toContain(
        teacher.firstName + ' ' + teacher.lastName.toUpperCase()
      );
    });

    it('Click on delete should delete the session', () => {
      sessionApiService.delete = jest.fn(
        () => new Observable((obs) => obs.next(sessionDeTest1))
      );
      const sessionApiSpy = jest.spyOn(sessionApiService, 'delete');
      const snackBarSpy = jest.spyOn(snackBar, 'open');
      const routerSpy = jest.spyOn(router, 'navigate');
      const deleteBtn: HTMLButtonElement =
        fixture.nativeElement.querySelectorAll('button')[1];
      deleteBtn?.click();
      expect(sessionApiSpy).toBeCalledWith('2');
      expect(snackBarSpy).toBeCalled();
      expect(routerSpy).toBeCalledWith(['sessions']);
    });
  });
});
