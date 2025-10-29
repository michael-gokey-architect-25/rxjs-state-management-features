// src/app/app.config.ts
/**
 * Application Configuration
 * 
 * Provides essential Angular services:
 * - Zone change detection with event coalescing
 * - Animations for Angular Material components
 * - HttpClient for API calls (simulated in this demo)
 */
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};
