/**
 * ============================================
 * src/app/components/filter/filter.component.ts
 * ============================================
 * FilterComponent - Reactive Form Inputs for Task Filtering
 * LEARNING POINTS:
 * - Two-way binding with ngModel triggers state updates
 * - Service methods update BehaviorSubjects
 * - Debouncing happens in the service layer (separation of concerns)
 * - Component only handles user interaction, service handles logic
 * ARCHITECTURE:
 * Component (UI events) → Service (state mutation) → Observable streams → UI update
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskStateService } from '../../services/task-state';
import { TaskStatusFilter } from '../../models/task';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  /**
   * Local state synced with service state
   * These drive the form inputs via two-way binding
   */
  searchTerm = '';
  statusFilter: TaskStatusFilter = 'all';
  
  /**
   * Dropdown options for status filter
   * Provides user-friendly labels for filter values
   */
  statusOptions: { value: TaskStatusFilter; label: string }[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];
  
  /**
   * Subject for unsubscribing from observables
   * PATTERN: takeUntil for memory leak prevention
   */
  private destroy$ = new Subject<void>();

  constructor(public taskService: TaskStateService) {}
  
  ngOnInit(): void {
    /**
     * Subscribe to service state to keep local state in sync
     * This ensures the form shows the current filter state
     * even if it's changed from elsewhere (e.g., URL params, reset button)
     */
    this.taskService.searchTerm$
      .pipe(takeUntil(this.destroy$))
      .subscribe(term => this.searchTerm = term);
    
    this.taskService.statusFilter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filter => this.statusFilter = filter);
  }
  
  /**
   * Called on every keystroke in search input
   * WHY NOT debounce here?
   * - Debouncing is done in the service's filteredTasks$ selector
   * - This keeps the input responsive (no lag) while filtering is optimized
   * - Separation of concerns: Component handles events, service handles logic
   */
  onSearchChange(term: string): void {
    this.taskService.setSearchTerm(term);
  }
  
  /**
   * Called when dropdown selection changes
   * Immediately updates filter (no debouncing needed for dropdown)
   */
  onStatusFilterChange(filter: TaskStatusFilter): void {
    this.taskService.setStatusFilter(filter);
  }
  
  /**
   * Clear search input and reset to empty string
   * Provides quick way to reset search filter
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.taskService.setSearchTerm('');
  }
  
  /**
   * CRITICAL: Unsubscribe from all observables on component destroy
   * Prevents memory leaks in Angular applications
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
