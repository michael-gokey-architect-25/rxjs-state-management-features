/**
 * src/app/components/task-form/task-form.component.ts
 * TaskFormComponent - Handles Task Creation
 * LEARNING POINTS:
 * - Reactive Forms with validation
 * - Subscribing to service method results
 * - Error handling from async operations
 * - Form reset after successful submission
 * - takeUntil pattern for cleanup
 * REACTIVE FORMS vs TEMPLATE-DRIVEN FORMS:
 * - Reactive: Form model defined in component class (this approach)
 * - Template-driven: Form model defined in template with ngModel
 * - Reactive forms are better for complex validation and testing
 */

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TaskStateService } from '../../services/task-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnDestroy {
  
  /**
   * Subject for unsubscribing from observables
   */
  private destroy$ = new Subject<void>();
  
  /**
   * Reactive form group
   * FormGroup structure:
   * - title: string (required, min 3 characters)
   * - description: string (optional)
   * - priority: 'low' | 'medium' | 'high' (required)
   */
  taskForm: FormGroup;
  
  /**
   * Submission state flag
   * Prevents double-submission while API call is in progress
   */
  isSubmitting = false;
  
  /**
   * Priority dropdown options
   * Provides user-friendly labels and icons
   */
  priorityOptions = [
    { value: 'low', label: 'Low Priority', icon: 'arrow_downward' },
    { value: 'medium', label: 'Medium Priority', icon: 'remove' },
    { value: 'high', label: 'High Priority', icon: 'arrow_upward' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskStateService
  ) {
    /**
     * Initialize form with validators
     * Validators:
     * - Validators.required: Field cannot be empty
     * - Validators.minLength(3): Minimum 3 characters
     * Default values:
     * - title: empty string
     * - description: empty string
     * - priority: 'medium' (sensible default)
     */
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: ['medium', Validators.required]
    });
  }
  

  /**
   * Submit form - demonstrates subscribing to service action
   * 1. Validate form
   * 2. Disable submit button (prevent double-submission)
   * 3. Call service method (returns Observable)
   * 4. Subscribe to handle success/error
   * 5. Reset form on success
   * 6. Re-enable submit button
   * NOTE: Service handles optimistic update and potential rollback
   */
  onSubmit(): void {
    if (this.taskForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const { title, description, priority } = this.taskForm.value;
      
      /**
       * Subscribe to service method
       * Service returns Observable from addTask method
       * Service already handles:
       * - Optimistic UI update
       * - API call simulation
       * - Rollback on error
       * - Error message display
       */
      this.taskService.addTask(title, description, priority)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (task) => {
            console.log('Task added successfully:', task);
            // Reset form to initial state (empty fields, default priority)
            this.taskForm.reset({ priority: 'medium' });
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error('Error adding task:', error);
            this.isSubmitting = false;
            // Service already handles error display via error$ stream
            // and shows snackbar notification in AppComponent
          }
        });
    } else {
      // Mark all fields as touched to show validation errors
      this.taskForm.markAllAsTouched();
    }
  }
  

  /**
   * Check if form field has specific error
   * Used in template to show error messages conditionally
   * Only shows errors after field has been touched (user interacted)
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field?.hasError(errorType) && field?.touched);
  }
  

  /**
   * Get user-friendly error message for field
   * Maps technical validation errors to readable messages
   */
  getErrorMessage(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    
    return '';
  }
  
  /**
   * Clean up subscriptions on component destroy
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
