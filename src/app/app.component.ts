/**
 * ============================================
 * src/app/app.component.ts
 * ============================================
 * AppComponent - Root Component
 * LEARNING POINTS:
 * - Composing multiple child components
 * - Subscribing to error stream for notifications
 * - Centralized error handling via service
 * - Clean architecture with presentational components
 * ARCHITECTURE PATTERN:
 * AppComponent orchestrates the entire application:
 * 1. Listens to global error stream
 * 2. Shows error notifications (snackbar)
 * 3. Composes child components
 * 4. Provides layout structure
 * All business logic lives in TaskStateService.
 * Components are thin and focused on presentation.
 * App Component Template Layout structure:
 * - Header (toolbar with branding)
 * - Main content area (centered container)
 * - Footer (credits)
 */
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FilterComponent } from './components/filter/filter';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskFormComponent } from './components/task-form/task-form';
import { StatsComponent } from './components/stats/stats';
import { TaskStateService } from './services/task-state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    FilterComponent,
    TaskListComponent,
    TaskFormComponent,
    StatsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  /**
   * Subject for unsubscribing from observables
   */
  private destroy$ = new Subject<void>();
  
  /**
   * Application title displayed in toolbar
   */
  title = 'RxJS Task Manager';

  constructor(
    private taskService: TaskStateService,
    private snackBar: MatSnackBar
  ) {
    /**
     * Subscribe to error stream to show notifications
     * PATTERN: Centralized Error Handling
     * - Service emits errors to error$ stream
     * - AppComponent listens and shows user-friendly notifications
     * - After showing, clear the error to prevent re-display
     * This pattern centralizes error display logic
     * Components don't need to handle error UI individually
     */
    this.taskService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        if (error) {
          // Show error snackbar
          this.snackBar.open(error, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          
          // Clear error after showing (prevents re-display on navigation)
          // Small timeout ensures snackbar is shown first
          setTimeout(() => this.taskService.clearError(), 100);
        }
      });
  }
  
  /**
   * Clean up subscriptions on component destroy
   * NOTE: This typically only runs when app closes
   * But good practice for reusable components
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
