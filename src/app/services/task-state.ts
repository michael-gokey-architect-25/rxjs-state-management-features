/**
 * ============================================
 * src/app/services/task-state.service.ts
 * ============================================
 * TaskStateService - Centralized RxJS State Management
 * This service demonstrates professional RxJS patterns for managing
 * application state without a heavy framework like NgRx.
 * 
 * KEY PATTERNS DEMONSTRATED:
 * 1. BehaviorSubject for writable state (private)
 * 2. Observable for read-only exposure (public)
 * 3. Derived state using operators (selectors)
 * 4. combineLatest for multi-stream composition
 * 5. shareReplay for efficient multicasting
 * 6. Optimistic updates with rollback on error
 * 7. Separation of concerns (state vs. presentation logic)
 * 
 * ARCHITECTURE:
 * - Private BehaviorSubjects hold mutable state
 * - Public Observables expose immutable state
 * - Action methods are the only way to modify state
 * - Selectors provide computed/derived values
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, throwError } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, catchError, shareReplay } from 'rxjs/operators';
import { Task, TaskStatusFilter, TaskStats } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskStateService {
  // ==========================================
  // PRIVATE STATE (Writable)
  // ==========================================
  // Only this service can call .next() on these subjects
  // This enforces unidirectional data flow
  
  /**
   * BehaviorSubject: Holds current value + emits immediately to new subscribers
   * 
   * WHY BehaviorSubject vs Subject vs ReplaySubject?
   * - BehaviorSubject: Always has a value, perfect for state
   * - Subject: No initial value, good for events
   * - ReplaySubject: Replays N values, good for caching
   */
  private tasksSubject = new BehaviorSubject<Task[]>(this.getInitialTasks());
  private searchTermSubject = new BehaviorSubject<string>('');
  private statusFilterSubject = new BehaviorSubject<TaskStatusFilter>('all');
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  
  // ==========================================
  // PUBLIC OBSERVABLES (Read-only)
  // ==========================================
  // Components subscribe to these
  // Using asObservable() prevents external code from calling .next()
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
  public searchTerm$: Observable<string> = this.searchTermSubject.asObservable();
  public statusFilter$: Observable<TaskStatusFilter> = this.statusFilterSubject.asObservable();
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();
  public error$: Observable<string | null> = this.errorSubject.asObservable();
  

  // ==========================================
  // DERIVED STATE (Selectors)
  // ==========================================
  // These are computed from base state using RxJS operators
  // They automatically update when dependencies change
  
  /**
   * Filtered Tasks Selector
   * PATTERN: combineLatest + map for multi-stream composition
   * Combines three streams:
   * 1. tasks$ - The full task list
   * 2. searchTerm$ - User's search input (with debouncing)
   * 3. statusFilter$ - Active/Completed/All filter
   * 
   * WHY debounceTime + distinctUntilChanged on searchTerm?
   * - debounceTime(300): Wait 300ms after user stops typing
   * - distinctUntilChanged: Only emit if value actually changed
   * - This prevents excessive filtering on every keystroke
   */
  public filteredTasks$: Observable<Task[]> = combineLatest([
    this.tasks$,
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    this.statusFilter$
  ]).pipe(
    map(([tasks, searchTerm, statusFilter]) => {
      let filtered = tasks;
      
      // Apply status filter
      if (statusFilter === 'active') {
        filtered = filtered.filter(t => !t.completed);
      } else if (statusFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
      }
      
      // Apply search filter (case-insensitive)
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(t => 
          t.title.toLowerCase().includes(term) ||
          (t.description?.toLowerCase().includes(term) ?? false)
        );
      }
      
      return filtered;
    }),
    /**
     * shareReplay: Share execution and replay last value
     * 
     * WHY shareReplay?
     * - Multiple components can subscribe without re-running logic
     * - Caches the last emitted value (bufferSize: 1)
     * - Auto-cleanup when all subscribers unsubscribe (refCount: true)
     */
    shareReplay({ bufferSize: 1, refCount: true })
  );
  

  /**
   * Task Statistics Selector
   * Demonstrates derived state for dashboard metrics.
   * Automatically recalculates when tasks change.
   */
  public taskStats$: Observable<TaskStats> = this.tasks$.pipe(
    map(tasks => ({
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      active: tasks.filter(t => !t.completed).length,
      highPriority: tasks.filter(t => t.priority === 'high').length
    })),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  

  /**
   * Completed Tasks Selector
   * Another example of a selector - filters only completed tasks.
   * Useful for separate "archive" views or reports.
   */
  public completedTasks$: Observable<Task[]> = this.tasks$.pipe(
    map(tasks => tasks.filter(t => t.completed)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor() {
    // Service initialization
    console.log('TaskStateService initialized');
  }
  

  // ==========================================
  // INITIALIZATION
  // ==========================================
  /**
   * Get initial mock tasks for demo purposes
   * In a real application:
   * - Fetch from API in constructor
   * - Handle loading/error states
   * - Use HttpClient with proper error handling
   */
  private getInitialTasks(): Task[] {
    return [
      {
        id: 1,
        title: 'Learn RxJS Fundamentals',
        description: 'Understand Observables, Subjects, and Operators',
        completed: true,
        createdAt: Date.now() - 86400000, // 1 day ago
        priority: 'high'
      },
      {
        id: 2,
        title: 'Build State Management Demo',
        description: 'Create a task manager using BehaviorSubject pattern',
        completed: false,
        createdAt: Date.now() - 3600000, // 1 hour ago
        priority: 'high'
      },
      {
        id: 3,
        title: 'Implement Derived State',
        description: 'Use combineLatest and map for computed values',
        completed: false,
        createdAt: Date.now() - 1800000, // 30 minutes ago
        priority: 'medium'
      },
      {
        id: 4,
        title: 'Add Error Handling',
        description: 'Implement catchError and retry logic',
        completed: false,
        createdAt: Date.now() - 900000, // 15 minutes ago
        priority: 'low'
      },
      {
        id: 5,
        title: 'Write Jest Tests',
        description: 'Test state mutations and observable emissions',
        completed: false,
        createdAt: Date.now() - 300000, // 5 minutes ago
        priority: 'medium'
      }
    ];
  }
  

  // ==========================================
  // ACTIONS (State Mutations)
  // ==========================================
  // These are the ONLY methods that can modify state
  // This creates a clear API and makes testing easier
  /**
   * ACTION: Add Task with Optimistic Update
   * PATTERN: Optimistic UI Update
   * 1. Update local state immediately (UI feels instant)
   * 2. Make API call in background
   * 3. If API fails, rollback to previous state
   * This provides the best user experience - no waiting for server!
   * 
   * @param title - Task title
   * @param description - Optional task description
   * @param priority - Task priority level
   * @returns Observable that emits the created task or error
   */
  addTask(title: string, description: string, priority: 'low' | 'medium' | 'high'): Observable<Task> {
    const newTask: Task = {
      id: Date.now(), // In real app, server generates ID
      title,
      description,
      completed: false,
      createdAt: Date.now(),
      priority
    };
    
    // Store current state for potential rollback
    const previousTasks = this.tasksSubject.value;
    
    // STEP 1: OPTIMISTIC UPDATE
    // Update UI immediately - user sees instant feedback
    this.tasksSubject.next([...previousTasks, newTask]);
    this.errorSubject.next(null); // Clear any previous errors
    
    // STEP 2: SIMULATE API CALL
    // In real app: return this.http.post<Task>('/api/tasks', newTask)
    return this.simulateApiCall(newTask).pipe(
      catchError(error => {
        // STEP 3: ROLLBACK ON ERROR
        console.error('Failed to add task:', error);
        this.tasksSubject.next(previousTasks); // Restore previous state
        this.errorSubject.next('Failed to add task. Please try again.');
        return throwError(() => error);
      })
    );
  }
  

  /**
   * ACTION: Toggle Task Completion Status
   * PATTERN: Immutable Update
   * - Never mutate the task object directly
   * - Create new array with new task object
   * - This ensures change detection works properly
   */
  toggleTask(taskId: number): void {
    const tasks = this.tasksSubject.value;
    const updatedTasks = tasks.map(task =>
      task.id === taskId 
        ? { ...task, completed: !task.completed } // Create new object
        : task // Keep reference to unchanged tasks
    );
    this.tasksSubject.next(updatedTasks);
    
    // In real app, you'd also sync with API:
    // this.http.patch(`/api/tasks/${taskId}`, { completed }).subscribe();
  }
  

  /**
   * ACTION: Delete Task with Optimistic Update
   * Same optimistic pattern as addTask
   */
  deleteTask(taskId: number): Observable<void> {
    const previousTasks = this.tasksSubject.value;
    
    // Optimistic update: Remove from UI immediately
    const updatedTasks = previousTasks.filter(t => t.id !== taskId);
    this.tasksSubject.next(updatedTasks);
    
    // Simulate API call
    return this.simulateApiDelete(taskId).pipe(
      catchError(error => {
        // Rollback on error
        console.error('Failed to delete task:', error);
        this.tasksSubject.next(previousTasks);
        this.errorSubject.next('Failed to delete task. Please try again.');
        return throwError(() => error);
      })
    );
  }
  

  /**
   * ACTION: Update Search Term
   * Pure client-side operation - no API call needed.
   * Debouncing happens in the filteredTasks$ selector.
   */
  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }
  

  /**
   * ACTION: Update Status Filter
   * Pure client-side operation - no API call needed.
   */
  setStatusFilter(filter: TaskStatusFilter): void {
    this.statusFilterSubject.next(filter);
  }
  
  /**
   * ACTION: Clear Error Message
   * Called after error is displayed to user.
   */
  clearError(): void {
    this.errorSubject.next(null);
  }
  


  // ==========================================
  // API SIMULATION (For Demo Purposes)
  // ==========================================
  // In production, replace these with actual HttpClient calls
  /**
   * Simulate API call with delay and potential failure
   * Demonstrates:
   * - Async operations returning Observables
   * - Random failures (10% error rate)
   * - Loading state management
   * REPLACE IN PRODUCTION:
   * return this.http.post<Task>('/api/tasks', data);
   */
  private simulateApiCall<T>(data: T): Observable<T> {
    return new Observable(subscriber => {
      this.loadingSubject.next(true);
      
      // Simulate network delay
      setTimeout(() => {
        // Simulate 10% failure rate for demo/testing
        if (Math.random() < 0.1) {
          subscriber.error(new Error('Simulated network error'));
        } else {
          subscriber.next(data);
          subscriber.complete();
        }
        this.loadingSubject.next(false);
      }, 500);
    });
  }
  
  /**
   * Simulate API delete operation
   * REPLACE IN PRODUCTION:
   * return this.http.delete<void>(`/api/tasks/${id}`);
   */
  private simulateApiDelete(id: number): Observable<void> {
    return new Observable(subscriber => {
      setTimeout(() => {
        console.log(`Task ${id} deleted from "server"`);
        subscriber.next();
        subscriber.complete();
      }, 300);
    });
  }
}
