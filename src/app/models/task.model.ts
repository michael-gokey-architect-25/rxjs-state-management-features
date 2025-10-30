/**
 * ============================================
 * src/app/models/task.model.ts
 * ============================================
 * Task Domain Models
 * Defines the core data structures used throughout the application.
 * These interfaces provide type safety and clear contracts for:
 * - Task entities
 * - Filter options
 * - Derived statistics
 */


/**
 * Task Interface
 * 
 * Represents a single task in our state management system.
 * 
 * DESIGN NOTES:
 * - Immutable approach: Always create new objects rather than mutating
 * - ID generation: Using timestamp for demo (use UUID in production)
 * - Priority levels: Enum-like union type for type safety
 */
export interface Task {
  /** Unique identifier for the task */
  id: number;
  
  /** Task title (required, user-facing) */
  title: string;
  
  /** Optional detailed description */
  description?: string;
  
  /** Completion status flag */
  completed: boolean;
  
  /** Unix timestamp of task creation */
  createdAt: number;
  
  /** Priority level affects sorting and visual emphasis */
  priority: 'low' | 'medium' | 'high';
}


/**
 * Task Status Filter Type
 * 
 * Used for filtering tasks by completion status in the UI.
 * 
 * USAGE:
 * - 'all': Show both active and completed tasks
 * - 'active': Show only incomplete tasks
 * - 'completed': Show only completed tasks
 */
export type TaskStatusFilter = 'all' | 'active' | 'completed';


/**
 * Task Statistics Interface
 * 
 * Derived state computed from the task list.
 * This demonstrates the "selector" pattern in RxJS state management.
 * 
 * PATTERN: Derived State
 * - Computed from base state (tasks array)
 * - Automatically updates when tasks change
 * - No manual recalculation needed
 * - Uses RxJS map operator in the service
 */
export interface TaskStats {
  /** Total number of tasks (active + completed) */
  total: number;
  
  /** Number of completed tasks */
  completed: number;
  
  /** Number of active (incomplete) tasks */
  active: number;
  
  /** Number of high-priority tasks (for quick insights) */
  highPriority: number;
}

/**
 * TESTING NOTES:
 * When testing components/services that use these interfaces:
 * 
 * 1. Create mock task factory functions:
 *    const createMockTask = (overrides?: Partial<Task>): Task => ({
 *      id: 1,
 *      title: 'Test Task',
 *      completed: false,
 *      createdAt: Date.now(),
 *      priority: 'medium',
 *      ...overrides
 *    });
 * 
 * 2. Test edge cases:
 *    - Empty task list (stats should be all zeros)
 *    - Tasks with missing optional fields (description)
 *    - Filter transitions (all → active → completed)
 * 
 * 3. Type safety in tests:
 *    - TypeScript will catch type mismatches
 *    - Use Partial<Task> for incomplete test data
 */
