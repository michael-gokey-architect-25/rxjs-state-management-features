// src/app/app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskStateService } from './services/task-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  // let mockTaskService: jasmine.SpyObj<TaskStateService>;
  // let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    // TODO: Create mock services
    // mockTaskService = jasmine.createSpyObj('TaskStateService', ['clearError'], {
    //   error$: of(null)
    // });
    // mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule
      ],
      // providers: [
      //   { provide: TaskStateService, useValue: mockTaskService },
      //   { provide: MatSnackBar, useValue: mockSnackBar }
      // ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component AppComponent', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Test title rendering
  // it('should have correct title', () => {
  //   expect(component.title).toBe('RxJS Task Manager');
  // });

  // TODO: Test error notification
  // it('should show snackbar when error occurs', (done) => {
  //   mockTaskService.error$ = of('Test error message');
  //   
  //   // Re-initialize component to trigger constructor subscription
  //   const newFixture = TestBed.createComponent(AppComponent);
  //   newFixture.detectChanges();
  //   
  //   setTimeout(() => {
  //     expect(mockSnackBar.open).toHaveBeenCalledWith(
  //       'Test error message',
  //       'Close',
  //       jasmine.any(Object)
  //     );
  //     done();
  //   }, 200);
  // });

  // TODO: Test component composition
  // it('should render all child components', () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('app-task-form')).toBeTruthy();
  //   expect(compiled.querySelector('app-filter')).toBeTruthy();
  //   expect(compiled.querySelector('app-task-list')).toBeTruthy();
  //   expect(compiled.querySelector('app-stats')).toBeTruthy();
  // });

  // TODO: Test cleanup
  // it('should unsubscribe on destroy', () => {
  //   spyOn(component['destroy$'], 'next');
  //   spyOn(component['destroy$'], 'complete');
  //   component.ngOnDestroy();
  //   expect(component['destroy$'].next).toHaveBeenCalled();
  //   expect(component['destroy$'].complete).toHaveBeenCalled();
  // });

  // TODO: Test toolbar rendering
  // it('should render toolbar with correct title', () => {
  //   const compiled = fixture.nativeElement;
  //   const toolbar = compiled.querySelector('.toolbar-title');
  //   expect(toolbar.textContent).toContain('RxJS Task Manager');
  // });

  // TODO: Test info banner
  // it('should render info banner', () => {
  //   const compiled = fixture.nativeElement;
  //   const infoBanner = compiled.querySelector('.info-banner');
  //   expect(infoBanner).toBeTruthy();
  //   expect(infoBanner.textContent).toContain('Learning RxJS State Management');
  // });
});
