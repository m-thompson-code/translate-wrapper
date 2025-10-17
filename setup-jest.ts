// setup-jest.ts (Angular 15–20 with jest-preset-angular v15)
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv();

// Optional polyfills depending on your app/tests:
import 'zone.js';
// import 'whatwg-fetch'; // if your tests expect fetch in JSDOM
