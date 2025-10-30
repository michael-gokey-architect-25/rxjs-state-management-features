// src/app/components/filter/filter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { TaskStateService } from '../../services/task-state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let mockTaskService: jasmine.SpyObj<TaskStateService>;

  beforeEach(async () => {
    // TODO: Create mock service
    // mockTaskService = jasmine.createSpyObj('TaskStateService', [
    //   'setSearchTerm',
    //   'setStatusFilter'
    // ]);

    await TestBed.configureTestingModule({
      imports: [
        FilterComponent,
        BrowserAnimationsModule
      ],
      // providers: [
      //   { provide: TaskStateService, useValue: mockTaskService }
      // ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component FilterComponent', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Test search input updates service
  // it('should call setSearchTerm when search input changes', () => {
  //   const testTerm = 'test search';
  //   component.onSearchChange(testTerm);
  //   expect(mockTaskService.setSearchTerm).toHaveBeenCalledWith(testTerm);
  // });

  // TODO: Test status filter updates service
  // it('should call setStatusFilter when dropdown changes', () => {
  //   component.onStatusFilterChange('active');
  //   expect(mockTaskService.setStatusFilter).toHaveBeenCalledWith('active');
  // });

  // TODO: Test clear search button
  // it('should clear search term when clear button clicked', () => {
  //   component.searchTerm = 'test';
  //   component.clearSearch();
  //   expect(component.searchTerm).toBe('');
  //   expect(mockTaskService.setSearchTerm).toHaveBeenCalledWith('');
  // });

  // TODO: Test cleanup on destroy
  // it('should unsubscribe on destroy', () => {
  //   spyOn(component['destroy$'], 'next');
  //   spyOn(component['destroy$'], 'complete');
  //   component.ngOnDestroy();
  //   expect(component['destroy$'].next).toHaveBeenCalled();
  //   expect(component['destroy$'].complete).toHaveBeenCalled();
  // });
});
