# Article App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.5.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Running JSON Server
The backend part of this project was made with json server and should be run on port 5000. Go to data directory and then run this command;
```
$ json-server --port 5000 --watch db.json
```

## Note
- 1 user comes dynamically from json server.
- If you want to add a new article, you can do so using this user.
- If you enter this user information while add a new article, you can edit or delete the article you clicked on the list, otherwise you will only get the details.
- If you refresh the page, you have to enter the user information again.



## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
