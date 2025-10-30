/**
 * src/app/components/stats/stats.component.ts
 * StatsComponent - Displays Derived State Statistics
 * LEARNING POINTS:
 * - Consuming derived state (selectors)
 * - Async pipe for automatic subscription
 * - Statistics computed from base state in service
 * - No direct state manipulation - only reads
 * - Pure presentation component (dumb component)
 * DERIVED STATE PATTERN:
 * This component demonstrates how derived state (selectors) work:
 * 1. Base state: tasks array in service
 * 2. Selector: taskStats$ computed using map operator
 * 3. Component: Displays computed values
 * 4. Auto-updates: When tasks change, stats recalculate automatically
 * This is more efficient than computing in component because:
 * - Computation happens once in service
 * - Multiple components can share same computation
 * - shareReplay prevents duplicate calculations
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TaskStateService } from '../../services/task-state.service';
import { TaskStats } from '../../models/task.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  taskStats$!: Observable<TaskStats>;

  constructor(public taskService: TaskStateService) {
    // Initialize in constructor
    this.taskStats$ = taskService.taskStats$;
  }
  
  
  /**
   * Calculate completion percentage
   * This is a pure function (no side effects)
   * Used in template to display percentage
   * @param completed - Number of completed tasks
   * @param total - Total number of tasks
   * @returns Percentage rounded to nearest integer
   */
  getCompletionPercentage(completed: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }
}
