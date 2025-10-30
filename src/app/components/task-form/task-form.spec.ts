// src/app/components/task-form/task-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskStateService } from '../../services/task-state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';


describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  // let mockTaskService: jasmine.SpyObj<TaskStateService>;

  beforeEach(async () => {
    // TODO: Create mock service
    // mockTaskService = jasmine.createSpyObj('TaskStateService', ['addTask']);

    await TestBed.configureTestingModule({
      imports: [
        TaskFormComponent,
        BrowserAnimationsModule
      ],
      // providers: [
      //   { provide: TaskStateService, useValue: mockTaskService }
      // ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component TaskFormComponent', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Test form initialization
  // it('should initialize form with default values', () => {
  //   expect(component.taskForm.get('title')?.value).toBe('');
  //   expect(component.taskForm.get('priority')?.value).toBe('medium');
  // });

  // TODO: Test form validation
  // describe('Form Validation', () => {
  //   it('should require title field', () => {
  //     const titleControl = component.taskForm.get('title');
  //     titleControl?.setValue('');
  //     expect(titleControl?.hasError('required')).toBe(true);
  //   });
  //   
  //   it('should enforce minimum length on title', () => {
  //     const titleControl = component.taskForm.get('title');
  //     titleControl?.setValue('ab');
  //     expect(titleControl?.hasError('minlength')).toBe(true);
  //   });
  // });

  // TODO: Test form submission
  // describe('Form Submission', () => {
  //   it('should call addTask when form is valid', (done) => {
  //     const mockTask = { id: 1, title: 'Test', completed: false, createdAt: Date.now(), priority: 'high' as const };
  //     mockTaskService.addTask.and.returnValue(of(mockTask));
  //     
  //     component.taskForm.patchValue({
  //       title: 'Test Task',
  //       description: 'Test Description',
  //       priority: 'high'
  //     });
  //     
  //     component.onSubmit();
  //     
  //     expect(mockTaskService.addTask).toHaveBeenCalledWith('Test Task', 'Test Description', 'high');
  //     done();
  //   });
  // });

  // TODO: Test form reset after successful submission
  // it('should reset form after successful submission', (done) => {
  //   const mockTask = { id: 1, title: 'Test', completed: false, createdAt: Date.now(), priority: 'medium' as const };
  //   mockTaskService.addTask.and.returnValue(of(mockTask));
  //   
  //   component.taskForm.patchValue({
  //     title: 'Test Task',
  //     priority: 'high'
  //   });
  //   
  //   component.onSubmit();
  //   
  //   setTimeout(() => {
  //     expect(component.taskForm.get('title')?.value).toBe('');
  //     expect(component.taskForm.get('priority')?.value).toBe('medium');
  //     done();
  //   }, 100);
  // });

  // TODO: Test error handling
  // it('should handle submission errors', (done) => {
  //   mockTaskService.addTask.and.returnValue(throwError(() => new Error('API Error')));
  //   
  //   component.taskForm.patchValue({
  //     title: 'Test Task',
  //     priority: 'medium'
  //   });
  //   
  //   component.onSubmit();
  //   
  //   setTimeout(() => {
  //     expect(component.isSubmitting).toBe(false);
  //     done();
  //   }, 100);
  // });

  // TODO: Test validation helper methods
  // it('should detect validation errors correctly', () => {
  //   const titleControl = component.taskForm.get('title');
  //   titleControl?.markAsTouched();
  //   titleControl?.setValue('');
  //   
  //   expect(component.hasError('title', 'required')).toBe(true);
  // });
});
