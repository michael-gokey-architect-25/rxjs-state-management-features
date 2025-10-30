/**
 * ============================================
 * src/app/components/task-list/task-list.component.ts
 * ============================================
 * TaskListComponent - Displays Filtered Task List
 * LEARNING POINTS:
 * - Async pipe for automatic subscription management (preferred)
 * - Manual subscription with takeUntil for cleanup (when needed)
 * - Observable streams flow from service to template
 * - Component delegates all state changes to service
 * - TrackBy function for performance optimization
 * WHY ASYNC PIPE?
 * - Automatically subscribes when component initializes
 * - Automatically unsubscribes when component destroys
 * - Triggers change detection when observable emits
 * - Cleaner code - no manual subscription management
 */
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskStateService } from '../../services/task-state.service';
import { Task } from '../../models/task.model';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Declare properties without initialization
  filteredTasks$!: Observable<Task[]>;
  loading$!: Observable<boolean>;

  constructor(public taskService: TaskStateService) {
    // Initialize in constructor
    this.filteredTasks$ = this.taskService.filteredTasks$;
    this.loading$ = this.taskService.loading$;
  }
  
  /**
   * Toggle task completion status
   * DELEGATION PATTERN:
   * - Component just handles UI events
   * - Service handles state mutation logic
   * - This keeps component thin and testable
   */
  onToggleTask(task: Task): void {
    this.taskService.toggleTask(task.id);
  }
  
  /**
   * Delete task with optimistic update
   * WHY subscribe here when we use async pipe elsewhere?
   * - Need to handle the result of the async operation
   * - Want to log success/error
   * - Service already handles UI update optimistically
   * NOTE: Use takeUntil to prevent memory leaks
   */
  onDeleteTask(task: Task): void {
    this.taskService.deleteTask(task.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log(`Task "${task.title}" deleted successfully`);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          // Error handling is already done in service (rollback + error message)
          // No need to show additional UI feedback here
        }
      });
  }
  
  /**
   * Get Material chip color based on priority.
   * Material Design color themes:
   * - primary: Blue (default)
   * - accent: Pink/Purple
   * - warn: Red
   */
  getPriorityColor(priority: string): 'primary' | 'accent' | 'warn' {
    switch (priority) {
      case 'high': return 'warn';      // Red for urgency
      case 'medium': return 'accent';   // Purple for moderate
      case 'low': return 'primary';     // Blue for low priority
      default: return 'primary';
    }
  }
  
  /**
   * Format timestamp to human-readable relative date
   * Examples:
   * - "Just now" (< 1 minute ago)
   * - "5m ago" (5 minutes ago)
   * - "2h ago" (2 hours ago)
   * - "3d ago" (3 days ago)
   * - "Jan 15, 2024" (> 7 days ago)
   */
  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  }
  
  /**
   * CRITICAL: Unsubscribe from all manual subscriptions
   * Memory leak prevention:
   * - Emit value to complete all takeUntil operators
   * - Complete the subject itself
   * NOTE: Async pipe subscriptions don't need this - they auto-cleanup!
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  /**
   * TrackBy function for *ngFor optimization
   * WHY trackBy?
   * - Tells Angular how to identify items in a list
   * - Prevents unnecessary DOM re-renders when list changes
   * - Only re-renders items that actually changed
   * - Significant performance boost for large lists
   * Without trackBy: Angular re-renders entire list on any change
   * With trackBy: Angular only updates changed items
   */
  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }
}
