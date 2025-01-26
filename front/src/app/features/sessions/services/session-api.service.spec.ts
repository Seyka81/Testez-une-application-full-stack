import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { Session } from '../interfaces/session.interface';
import { Observable, Subscription } from 'rxjs';

describe('SessionsService', () => {
  let service: SessionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SessionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('SessionsService with mocked http', () => {
  let subs: Subscription[];
  let service: SessionApiService;
  let http: HttpClient;
  const now = new Date();
  const sessionDeTest1 = {
    id: 1,
    name: 'Relax With Yoga',
    description: 'A relaxing yoga session',
    date: now,
    teacher_id: 1,
    users: [1, 2, 3, 4],
    createdAt: now,
    updatedAt: now,
  };
  const sessionDeTest2 = {
    id: 3,
    name: 'A new relax session',
    description: 'yoga session',
    date: now,
    teacher_id: 1,
    users: [1, 2, 3],
    createdAt: now,
    updatedAt: now,
  };

  beforeEach(() => {
    subs = [];
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(SessionApiService);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    subs.forEach((sub) => sub.unsubscribe());
  });

  it('should return an observable of a session collection', (done) => {
    http.get = jest.fn(
      () =>
        new Observable<any>((obs) => obs.next([sessionDeTest1, sessionDeTest2]))
    );
    subs.push(
      service.all().subscribe((sessions) => {
        expect(sessions.length).toBe(2);
        expect(sessions[0]).toBe(sessionDeTest1);
        expect(sessions[1]).toBe(sessionDeTest2);
        done();
      })
    );
  });

  it('delete should return an observable of a session', (done) => {
    http.delete = jest.fn(
      () => new Observable<any>((obs) => obs.next(sessionDeTest1))
    );
    subs.push(
      service.delete('1').subscribe((session) => {
        expect(session).toBe(sessionDeTest1);
        done();
      })
    );
  });

  it('create should return an observable of a session', (done) => {
    const sessionDeTest3 = Object({
      id: 3,
      name: 'A last relax session',
      description: 'Une session de test',
      date: now,
      teacher_id: 1,
      users: [1, 2, 3, 4, 5],
      createdAt: now,
      updatedAt: now,
    }) as Session;
    http.post = jest.fn(
      () => new Observable<any>((obs) => obs.next(sessionDeTest3))
    );
    subs.push(
      service.create(sessionDeTest3).subscribe((session) => {
        expect(session).toBe(sessionDeTest3);
        done();
      })
    );
  });

  it('participate should subscribe user to a session', (done) => {
    http.post = jest.fn(() => new Observable<any>((obs) => obs.next()));
    subs.push(
      service.participate('1', '2').subscribe(() => {
        done();
      })
    );
  });

  it('update should return an observable of a session', (done) => {
    http.put = jest.fn(
      () => new Observable<any>((obs) => obs.next(sessionDeTest2))
    );
    const userUpdated = { ...sessionDeTest2 } as Session;
    subs.push(
      service.update('2', userUpdated).subscribe((session) => {
        expect(session).toBe(sessionDeTest2);
        done();
      })
    );
  });

  it('unparticipate should unsubscribe user to a session', (done) => {
    http.delete = jest.fn(() => new Observable<any>((obs) => obs.next()));
    subs.push(
      service.unParticipate('1', '2').subscribe(() => {
        done();
      })
    );
  });
});
