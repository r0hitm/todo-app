# ToDo App

This project is a ToDo App originally inspired by [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/todo-list). It was initially created using HTML, CSS, and JavaScript. However, this version of the project has been enhanced with TypeScript and React. Instead of using Webpack, Vite is utilized as the bundler, and testing is done with vitest.

The primary objective of this project is to provide a practical learning experience. This is not intended to be a production-ready application.

Notable features and learning points of this project include:

- Implementation of ES6 modules and classes
    - Refactored and tested models for ToDo items and lists (new)

- Using React
    - Context API for state management (new)
    - Implemented three custom hooks (new)

- Integration of TypeScript for code reliability and maintainability. (new)
    - (PS: I don't think I'll ever go back to JavaScript ;)
- Incorporation of Firebase for user authentication and data storage to sync user data (new)
    - Setup Firebase project and configured authentication and database
    - Implemented authentication with Google
    - Implemented firestore (cloud database) to store user data
    - Implemented Firebase security rules to restrict access to user data
- Utilization of Vite as the bundling tool (vite has better DX and is faster than webpack)
- Unit testing of models with vitest (new)


&copy; 2023 [Rohit Mehta](https://github.com/r0hitm)
