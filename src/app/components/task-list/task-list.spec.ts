// src/app/components/task-list/task-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list';
import { TaskStateService } from '../../services/task-state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';


describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  // let mockTaskService: jasmine.SpyObj<TaskStateService>;

  beforeEach(async () => {
    // TODO: Create mock service with observables
    // mockTaskService = jasmine.createSpyObj('TaskStateService', 
    //   ['toggleTask', 'deleteTask'],
    //   {
    //     filteredTasks$: of([]),
    //     loading$: of(false)
    //   }
    // );

    await TestBed.configureTestingModule({
      imports: [
        TaskListComponent,
        BrowserAnimationsModule
      ],
      // providers: [
      //   { provide: TaskStateService, useValue: mockTaskService }
      // ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component TaskListComponent', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Test task rendering
  // it('should render tasks from filteredTasks$ observable', () => {
  //   const mockTasks = [
  //     { id: 1, title: 'Test Task', completed: false, createdAt: Date.now(), priority: 'high' as const }
  //   ];
  //   mockTaskService.filteredTasks$ = of(mockTasks);
  //   fixture.detectChanges();
  //   
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.task-title').textContent).toContain('Test Task');
  // });

  // TODO: Test empty state
  // it('should show empty state when no tasks', () => {
  //   mockTaskService.filteredTasks$ = of([]);
  //   fixture.detectChanges();
  //   
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.empty-state')).toBeTruthy();
  // });

  // TODO: Test toggle task
  // it('should call toggleTask when checkbox clicked', () => {
  //   const mockTask = { id: 1, title: 'Test', completed: false, createdAt: Date.now(), priority: 'medium' as const };
  //   component.onToggleTask(mockTask);
  //   expect(mockTaskService.toggleTask).toHaveBeenCalledWith(1);
  // });

  // TODO: Test delete task
  // it('should call deleteTask when delete button clicked', (done) => {
  //   const mockTask = { id: 1, title: 'Test', completed: false, createdAt: Date.now(), priority: 'low' as const };
  //   mockTaskService.deleteTask.and.returnValue(of(void 0));
  //   
  //   component.onDeleteTask(mockTask);
  //   expect(mockTaskService.deleteTask).toHaveBeenCalledWith(1);
  //   done();
  // });

  // TODO: Test priority color mapping
  // it('should return correct color for priority levels', () => {
  //   expect(component.getPriorityColor('high')).toBe('warn');
  //   expect(component.getPriorityColor('medium')).toBe('accent');
  //   expect(component.getPriorityColor('low')).toBe('primary');
  // });

  // TODO: Test date formatting
  // it('should format recent dates correctly', () => {
  //   const now = Date.now();
  //   expect(component.formatDate(now - 30000)).toBe('Just now');
  //   expect(component.formatDate(now - 300000)).toContain('ago');
  // });

  // TODO: Test trackBy function
  // it('should track tasks by id', () => {
  //   const task = { id: 123, title: 'Test', completed: false, createdAt: Date.now(), priority: 'medium' as const };
  //   expect(component.trackByTaskId(0, task)).toBe(123);
  // });
});

