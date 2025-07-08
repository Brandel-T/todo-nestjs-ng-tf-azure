# Docs for the Azure Web Apps Deploy action: https://github.com/Azure/webapps-deploy
# More GitHub Actions for Azure: https://github.com/Azure/actions

name: Build and deploy Backend to Azure Web App | nest-todo-backend

on:
  push:
    branches:
      - main
    paths:
      - backend/**
      - .github/workflows/main_nest-todo-backend.yml
  pull_request:
    branches:
      - main
    paths:
      - backend/**
      - .github/workflows/main_nest-todo-backend.yml
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read #This is required for actions/checkout

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js version
        uses: actions/setup-node@v3
        with:
          node-version: '22.x'

      - name: Cache Node.js modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: npm install, build, and test
        working-directory: backend
        run: |
          npm ci
          npm run build
          npm run test

      - name: Prepare and Zip artifact for deployment
        working-directory: ./backend
        run: zip -r release.zip .

      - name: Upload artifact for deployment job
        uses: actions/upload-artifact@v4
        with:
          name: backend-app
          path: backend/release.zip

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: 'Production'
      url: ${{ steps.deploy-to-webapp.outputs.webapp-url }}
    
    steps:
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: backend-app

      - name: Unzip artifact for deployment
        run: unzip api-release.zip      
      
      - name: 'Deploy to Azure Web App'
        id: deploy-to-webapp
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'nest-todo-backend'
          slot-name: 'Production'
          package: .
          publish-profile: ${{ secrets.AZUREAPPSERVICE_PUBLISHPROFILE_B1B230EC06E94F1DB2EE2F56FBFEDFE6 }}
