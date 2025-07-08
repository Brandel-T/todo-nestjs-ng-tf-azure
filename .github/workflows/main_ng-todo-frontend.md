name: Build and deploy Frontend to Azure Web App | ng-todo-frontend

on:
  push:
    branches:
      - main
    paths:
      - frontend/**
      - .github/workflows/main_ng-todo-frontend.yml
  pull_request:
    branches:
      - main
    paths:
      - frontend/**
      - .github/workflows/main_ng-todo-frontend.yml
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read # Required for actions/checkout

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v3
        with:
          node-version: "22.x"

      - name: Cache Node.js modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: npm install, build, and test
        working-directory: frontend
        run: |
          npm ci
          npm run build -- --configuration production
          npm run test -- --watch=false --browsers=ChromeHeadless

      - name: Zip artifact for deployment
        working-directory: ./frontend
        run: zip -r release.zip ./dist/frontend/*

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: frontend-app
          path: frontend/release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: "Production"
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}

    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: frontend-app

      - name: Unzip artifact for deployment
        run: |
          unzip release.zip

      - name: "Deploy to Azure Web App"
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v3
        with:
          app-name: "ng-todo-frontend"
          slot-name: "Production"
          package: .
          publish-profile: ${{ secrets.AZUREAPPSERVICE_PUBLISHPROFILE_FB609C6D90D6452BA2D754D7D095CE6B }}
