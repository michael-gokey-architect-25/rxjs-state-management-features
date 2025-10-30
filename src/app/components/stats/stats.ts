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
import { TaskStateService } from '../../services/task-state';


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
  constructor(public taskService: TaskStateService) {}
  /**
   * Expose derived state observable to template
   * taskStats$ is computed in the service using:
   * this.tasks$.pipe(map(tasks => ({ ... computed stats ... })))
   * Benefits:
   * - Always up-to-date (reactive)
   * - No manual recalculation needed
   * - Efficient (shareReplay caching)
   * - Testable (mock the observable)
   */
  taskStats$ = this.taskService.taskStats$;

  
  
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
