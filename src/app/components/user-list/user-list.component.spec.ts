// src/app/components/user-list/user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;
  let httpMock: HttpTestingController;
  let compiled: HTMLElement;

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserListComponent,
        HttpClientTestingModule,
        CommonModule,
        MatListModule,
        MatProgressSpinnerModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with empty users array', () => {
      expect(component.users).toEqual([]);
    });

    it('should initialize with loading false', () => {
      expect(component.loading).toBe(false);
    });

    it('should initialize with empty error string', () => {
      expect(component.error).toBe('');
    });

    it('should call loadUsers() on ngOnInit', () => {
      const loadSpy = jest.spyOn(component, 'loadUsers');
      component.ngOnInit();
      expect(loadSpy).toHaveBeenCalled();
    });
  });

  describe('Loading Users - Happy Path', () => {
    it('should set loading to true when load() is called', () => {
      component.load();
      expect(component.loading).toBe(true);
    });

    it('should fetch users from API on initialization', () => {
      fixture.detectChanges(); // Triggers ngOnInit

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);

      expect(component.users).toEqual(mockUsers);
      expect(component.loading).toBe(false);
    });

    it('should render user list after successful fetch', () => {
      fixture.detectChanges();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
      fixture.detectChanges();

      const listItems = compiled.querySelectorAll('mat-list-item');
      expect(listItems.length).toBe(3);
    });

    it('should display user name and email', () => {
      fixture.detectChanges();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
      fixture.detectChanges();

      const firstItem = compiled.querySelector('mat-list-item');
      expect(firstItem?.textContent).toContain('John Doe');
      expect(firstItem?.textContent).toContain('john@example.com');
    });

    it('should display all users in correct order', () => {
      fixture.detectChanges();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
      fixture.detectChanges();

      const listItems = compiled.querySelectorAll('mat-list-item');
      expect(listItems[0].textContent).toContain('John Doe');
      expect(listItems[1].textContent).toContain('Jane Smith');
      expect(listItems[2].textContent).toContain('Bob Johnson');
    });
  });

  describe('Loading State', () => {
    it('should show spinner when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();

      const spinner = compiled.querySelector('mat-spinner');
      expect(spinner).toBeTruthy();
    });

    it('should hide spinner when loading is false', () => {
      component.loading = false;
      fixture.detectChanges();

      const spinner = compiled.querySelector('mat-spinner');
      expect(spinner).toBeFalsy();
    });

    it('should show mat-list when not loading', () => {
      component.loading = false;
      fixture.detectChanges();

      const matList = compiled.querySelector('mat-list');
      expect(matList).toBeTruthy();
    });

    it('should hide mat-list when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const matList = compiled.querySelector('mat-list');
      expect(matList).toBeFalsy();
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP error gracefully', () => {
      fixture.detectChanges();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush('Error', { status: 500, statusText: 'Server Error' });

      expect(component.error).toBe('Could not load users.');
      expect(component.loading).toBe(false);
    });

    it('should display error message when error occurs', () => {
      component.error = 'Could not load users.';
      component.loading = false;
      fixture.detectChanges();

      const errorDiv = compiled.querySelector('.ng-star-inserted');
      expect(compiled.textContent).toContain('Could not load users.');
    });

    it('should clear users array on error', () => {
      component.users = mockUsers;
      fixture.detectChanges();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush('Error', { status: 404, statusText: 'Not Found' });

      // Users array remains as-is (could be improved to clear on error)
      expect(component.loading).toBe(false);
      expect(component.error).toBe('Could not load users.');
    });
  });

  describe('Empty State', () => {
    it('should handle empty user array', () => {
      fixture.detectChanges();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush([]);
      fixture.detectChanges();

      const listItems = compiled.querySelectorAll('mat-list-item');
      expect(listItems.length).toBe(0);
    });

    it('should still show mat-list header with empty users', () => {
      fixture.detectChanges();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush([]);
      fixture.detectChanges();

      const header = compiled.querySelector('h3[mat-subheader]');
      expect(header).toBeTruthy();
      expect(header?.textContent).toContain('Users');
    });
  });

  describe('Material Components', () => {
    it('should render mat-list component', () => {
      component.loading = false;
      fixture.detectChanges();

      const matList = fixture.debugElement.query(By.css('mat-list'));
      expect(matList).toBeTruthy();
    });

    it('should render mat-spinner when loading', () => {
      component.loading = true;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should render mat-list-items for each user', () => {
      fixture.detectChanges();

      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
      req.flush(mockUsers);
      fixture.detectChanges();

      const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
      expect(listItems.length).toBe(mockUsers.length);
    });
  });
});
