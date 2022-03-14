# Application Purpose
To create a single page angular application and use the following API to retrieve sports results and
sort into a table of results that are displayed. Each sport result contains several data and always
includes the publication time.

Method: POST
Content-Type: application/json
Url: https://ancient-wood-1161.getsandbox.com:443/results

Tasks:
- Display the sports results in reverse chronological order on the page.
- Add a filter to the page to display only certain types or events (e.g. f1Results)
- How can you confirm the code works?
- Bonus: Implement the rest call asynchronously

# Introduction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

# Getting Started

### Installation process
Install and run a dev server.  Navigate to http://localhost:4200.  The app will reload if any changes to the source files.

Run 'npm install'
Run 'npm start'

Added flag to environment to swtich between mock and real data 
useMockService: true

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
- [NgRx](https://ngrx.io/docs)
- [Visual Studio Code](https://github.com/Microsoft/vscode)

## Structure of the project
- core:
  - constants
    - enums
    - mock
    - models
    - services
- results: UI components
    - Container   - results      - aware of exisitence of the state. Subscribes to select() and dispatch actions to update state
    - Components  - results-list - presentation component
- store: results-store
    - actions:    contains all Store actions.
    - effects:    contains all the Store effects.
    - reducers:   contains the Feature module state together with the reducers.
    - selectors:  folder contains all the selectors.
    **index.ts file is a barrel file to export everything from the respective folders (to make referencing the Store easier in the application via short paths).

## NGRX state management in this application
  ```

                                     +-----------------------+                 +----------+
 +---------------+                  |                       |                 |          |
 |  SELECTOR     |<-----------------|       STORE           |                 |  SERVER  |
 +---------------+                  |                       |                 |          |
        |                            +-----------------------+                 +----------+
        |                                     ^                                 ^     |
        |                                     |                                 |     |
        |                                     |                                 |     v
        |                             +----------------+                  +-----------------+
        |                             |   REDUCER/S    |                  |     SERVICE     |
        |                             +----------------+                  +-----------------+
        |                                     ^                               ^         |
        |                                     |                               |         |
        v                                     |                               |         v
+-----------------+                   +----------------+ <--------------- +------------------+
|     COMPONENT   |-----------------> |   ACTION/S     |                  |     EFFECTS      |
+-----------------+                   +----------------+ ---------------> +------------------+

Store:      provide single source of truth and state is readonly and immutable
Reducer:    a pure function, catches action and performs the update on state and returns new immutable state object
Actions:    to update state application need to dispatch 'action'
Selectors:  a pure function that take slices of the state as input and return slices of state date that component consumes
Effects:    listens to the actions dispatch to the store. Once effects receive data from server-side, it dispatches a new action to 
            the store so that reducer kicks in and handles the data received fromthe Effect and updates the state
Component:  UI. anular components defines two types of components
            1. Smart/Container: aware of exisitence of the state. Subscribes to select() and dispatch actions to update state   
            2. Presentation: defines @Input() to receive slice of data or @Output() to emit events to request pdate in state
Service:    A custom Service wrapping all application related Web API calls (POST, GET, PUT, etc)


All Actions that are dispatched within an application state are always first processed 
by the Reducers before being handled by the Effects of the application state.