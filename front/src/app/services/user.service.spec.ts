import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { Observable, Subscription } from 'rxjs';

describe('UserService', () => {
  let service: UserService;

  let http: HttpClient;
  const now = new Date();
  let randomUser = {
    id: 1,
    email: 'random@gmail.com',
    lastName: 'gmail',
    firstName: 'random',
    admin: true,
    createdAt: now,
    updatedAt: now,
  };
  let subs: Subscription[];

  beforeEach(() => {
    subs = [];
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: { get: jest.fn(), delete: jest.fn() },
        },
      ],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    subs.forEach((sub) => sub.unsubscribe());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('delete should return an observable', (done) => {
    http.delete = jest.fn(
      () => new Observable<any>((obs) => obs.next(randomUser))
    );
    subs.push(
      service.delete('1').subscribe((user) => {
        expect(user).toBe(randomUser);
        done();
      })
    );
  });
});
