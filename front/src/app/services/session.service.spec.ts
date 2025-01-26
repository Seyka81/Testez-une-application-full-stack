import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { SessionService } from './session.service';
import { Subscription } from 'rxjs';

describe('SessionService', () => {
  let service: SessionService;
  let subs: Subscription[];

  beforeEach(() => {
    subs = [];
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  afterEach(() => {
    subs.forEach((sub) => sub.unsubscribe());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('$isLogged should return a boolean observable', (done) => {
    subs.push(
      service.$isLogged().subscribe((logged) => {
        expect(logged).toBe(false);
        done();
      })
    );
  });

  it('logIn should work', () => {
    const session = Object({
      token: 'token',
      type: 'type',
      username: 'userName',
      firstName: 'firstName',
      lastName: 'lastName',
      admin: true,
    }) as SessionInformation;
    service.logIn(session);
  });

  it('logOut should work', () => {
    service.logOut();
  });
});
