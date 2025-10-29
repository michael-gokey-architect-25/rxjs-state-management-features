// src/app/components/hello/hello.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';
import { MatCardModule } from '@angular/material/card';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HelloComponent', () => {
  let component: HelloComponent;
  let fixture: ComponentFixture<HelloComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloComponent, MatCardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HelloComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct message property', () => {
    expect(component.message).toBe('Welcome to the Angular Jest Starter!');
  });

  describe('Template Rendering', () => {
    it('should render mat-card component', () => {
      const matCard = compiled.querySelector('mat-card');
      expect(matCard).toBeTruthy();
    });

    it('should render mat-card-header with title', () => {
      const cardTitle = compiled.querySelector('mat-card-title');
      expect(cardTitle).toBeTruthy();
      expect(cardTitle?.textContent).toContain('Hello Component');
    });

    it('should render mat-card-content', () => {
      const cardContent = compiled.querySelector('mat-card-content');
      expect(cardContent).toBeTruthy();
    });

    it('should display the message in a paragraph', () => {
      const paragraph = compiled.querySelector('mat-card-content p');
      expect(paragraph).toBeTruthy();
      expect(paragraph?.textContent).toContain('Welcome to the Angular Jest Starter!');
    });

    it('should update the display when message property changes', () => {
      component.message = 'Updated message';
      fixture.detectChanges();

      const paragraph = compiled.querySelector('mat-card-content p');
      expect(paragraph?.textContent).toContain('Updated message');
    });
  });

  describe('Material Card Structure', () => {
    it('should have correct card structure hierarchy', () => {
      const cardHeader = compiled.querySelector('mat-card mat-card-header');
      const cardContent = compiled.querySelector('mat-card mat-card-content');
      
      expect(cardHeader).toBeTruthy();
      expect(cardContent).toBeTruthy();
    });

    it('should render all material card components', () => {
      const matCard = fixture.debugElement.query(By.css('mat-card'));
      const matCardHeader = fixture.debugElement.query(By.css('mat-card-header'));
      const matCardTitle = fixture.debugElement.query(By.css('mat-card-title'));
      const matCardContent = fixture.debugElement.query(By.css('mat-card-content'));

      expect(matCard).toBeTruthy();
      expect(matCardHeader).toBeTruthy();
      expect(matCardTitle).toBeTruthy();
      expect(matCardContent).toBeTruthy();
    });
  });
});
