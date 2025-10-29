// src/main.ts
/**
 * Main entry point for the Angular application
 * Bootstraps the standalone AppComponent with configuration
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Application bootstrap error:', err));
