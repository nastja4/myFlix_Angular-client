# MyFlix_Angular Client

The myFlix Angular App is a single-page, responsive movie application built using Angular. It serves as the client-side interface for the myFlix movie app, interacting with the existing server-side code and database through REST API endpoints.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

Link:
https://nastja4.github.io/myFlix_Angular-client/

Screenshots:

<img src="https://github.com/nastja4/myFlix_Angular-client/assets/126527606/5f440900-defb-4439-9c57-1b564d5ee843" width="500" alt="Screenshot">

<img src="https://github.com/nastja4/myFlix_Angular-client/assets/126527606/501d719f-ed94-4cf1-9768-e5113f3199c5" width="500" alt="Screenshot">

<img src="https://github.com/nastja4/myFlix_Angular-client/assets/126527606/b1fd274e-69ca-4a98-92cd-5e95aaf21889" width="500" alt="Screenshot">

<img src="https://github.com/nastja4/myFlix_Angular-client/assets/126527606/9ef47950-6d41-4a0f-9dd2-c89e854b4c4b" width="500" alt="Screenshot">

<img src="https://github.com/nastja4/myFlix_Angular-client/assets/126527606/00dae250-0550-4f28-96d5-25a354f47f58" width="500" alt="Screenshot">

<img src="https://github.com/nastja4/myFlix_Angular-client/assets/126527606/9d855fc4-5d59-44b8-84aa-9b49965c5a17" width="500" alt="Screenshot">




## Table of Contents

- [Description](#description)
- [User Stories](#user-stories)
- [Key Features](#key-features)
- [Technical Requirements](#technical-requirements)
- [Getting Started](#getting-started)
- [Code Scaffolding](#code-scaffolding)
- [Contributing](#contributing)
- [Further help](#further-help)
- [License](#license)

## Description

The myFlix Angular App allows users to access information about movies, directors, and genres. Users can create profiles to save data about their favorite movies, making it a valuable resource for movie enthusiasts.

## User Stories
- As a user, I can receive information on movies, directors, and genres.
- As a user, I can create a profile to save data about my favorite movies.

## Key Features

- Welcome view for user authentication (login/register).
- View all movies once authenticated.
- Single movie view with additional features:
  - Director view: Details about the director of the movie.
  - Genre view: Details about the genre of the movie.

## Technical Requirements

- Angular (version 9 or later)
- Node.js (latest version) and npm
- User registration and login forms
- Angular Material for UI design
- Codebase comments using Typedoc
- Technical documentation using JSDoc
- Hosting on GitHub Pages

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```
2. Install project dependencies:
```bash
cd myFlix-Angular
npm install -g @angular/cli (or @angular/cli@latest)
```
For using Angular Material (variety of UI components):
```
ng add @angular/material
```
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Contributing
Contributions are welcome! 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License
This project is licensed under the terms of the MIT License. See the LICENSE file for details.
