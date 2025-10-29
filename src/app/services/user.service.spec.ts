// src/app/services/user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return an Observable<any[]>', () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];

      service.getUsers().subscribe(users => {
        expect(users).toBeTruthy();
        expect(users.length).toBe(2);
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should handle empty array response', () => {
      service.getUsers().subscribe(users => {
        expect(users).toEqual([]);
        expect(users.length).toBe(0);
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush([]);
    });

    it('should handle HTTP error gracefully', () => {
      const errorMessage = 'Network error';

      service.getUsers().subscribe({
        next: () => fail('should have failed with 500 error'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Server Error');
        }
      });

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });

    it('should make only one HTTP request', () => {
      service.getUsers().subscribe();
      
      const requests = httpMock.match('https://jsonplaceholder.typicode.com/users');
      expect(requests.length).toBe(1);
      
      requests[0].flush([]);
    });
  });
});
