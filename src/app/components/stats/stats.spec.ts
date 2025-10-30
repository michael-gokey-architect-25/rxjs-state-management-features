// src/app/components/stats/stats.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { TaskStateService } from '../../services/task-state.service';
import { of } from 'rxjs';
import { TaskStats } from '../../models/task.model';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;
  // let mockTaskService: jasmine.SpyObj<TaskStateService>;

  beforeEach(async () => {
    // TODO: Create mock service with taskStats$ observable
    // const mockStats: TaskStats = {
    //   total: 10,
    //   completed: 5,
    //   active: 5,
    //   highPriority: 2
    // };
    // 
    // mockTaskService = jasmine.createSpyObj('TaskStateService', [], {
    //   taskStats$: of(mockStats)
    // });

    await TestBed.configureTestingModule({
      imports: [StatsComponent],
      // providers: [
      //   { provide: TaskStateService, useValue: mockTaskService }
      // ]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component StatsComponent', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Test stats rendering
  // it('should display stats from taskStats$ observable', () => {
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   
  //   expect(compiled.querySelector('.stat-value').textContent).toContain('10');
  // });

  // TODO: Test completion percentage calculation
  // describe('getCompletionPercentage', () => {
  //   it('should calculate percentage correctly', () => {
  //     expect(component.getCompletionPercentage(5, 10)).toBe(50);
  //     expect(component.getCompletionPercentage(7, 10)).toBe(70);
  //   });
  //   
  //   it('should return 0 when total is 0', () => {
  //     expect(component.getCompletionPercentage(0, 0)).toBe(0);
  //   });
  //   
  //   it('should round to nearest integer', () => {
  //     expect(component.getCompletionPercentage(1, 3)).toBe(33);
  //     expect(component.getCompletionPercentage(2, 3)).toBe(67);
  //   });
  // });

  // TODO: Test reactive updates
  // it('should update when stats change', (done) => {
  //   const newStats: TaskStats = {
  //     total: 15,
  //     completed: 10,
  //     active: 5,
  //     highPriority: 3
  //   };
  //   
  //   mockTaskService.taskStats$ = of(newStats);
  //   fixture.detectChanges();
  //   
  //   component.taskStats$.subscribe(stats => {
  //     expect(stats.total).toBe(15);
  //     expect(stats.completed).toBe(10);
  //     done();
  //   });
  // });

  // TODO: Test empty state
  // it('should handle zero stats gracefully', () => {
  //   const emptyStats: TaskStats = {
  //     total: 0,
  //     completed: 0,
  //     active: 0,
  //     highPriority: 0
  //   };
  //   
  //   mockTaskService.taskStats$ = of(emptyStats);
  //   fixture.detectChanges();
  //   
  //   expect(component.getCompletionPercentage(0, 0)).toBe(0);
  // });
});

