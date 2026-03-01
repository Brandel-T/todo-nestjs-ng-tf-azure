# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

|||
| -------- | ------- |
| ![Frontend preview 1](/doc/fe-1.png)  | ![Frontend preview 1](/doc/fe-2.png)    |

## Development server

To start a local development server, run:

```bash
# if angular CLI is installed globally
ng serve

# if angular CLI is not installed globally
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🛑 Challenges / Takeaways

### Deployment

- Build the angular app using the **application builder** `"builder": "@angular-devkit/build-angular:application"`
- Zip the app and upload the `dist/<app name>` folder. Nothing shall be missing, otherwise the application won#t get shown on browser
