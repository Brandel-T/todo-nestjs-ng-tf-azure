[![Fullstack Todo | Test CI](https://github.com/Brandel-T/todo-nestjs-ng-tf-azure/actions/workflows/ci.yml/badge.svg)](https://github.com/Brandel-T/todo-nestjs-ng-tf-azure/actions/workflows/ci.yml)

[![Build and deploy NestJS app to Azure Web App - todo-backend](https://github.com/Brandel-T/todo-nestjs-ng-tf-azure/actions/workflows/main_todo-backend.yml/badge.svg)](https://github.com/Brandel-T/todo-nestjs-ng-tf-azure/actions/workflows/main_todo-backend.yml)

[![Azure Static Web Apps CI/CD](https://github.com/Brandel-T/todo-nestjs-ng-tf-azure/actions/workflows/azure-static-web-apps-nice-wave-049b5d303.yml/badge.svg)](https://github.com/Brandel-T/todo-nestjs-ng-tf-azure/actions/workflows/azure-static-web-apps-nice-wave-049b5d303.yml)

# fullstack-nestjs-ng-azure-tf

A full-stack application from design to deployment on Azure, including IaC via Terraform.

🎯 My goal with this project was not about having a complex app, but rather to demonstrate the end-to-end process of building, containerizing, and deploying a full-stack application using modern technologies and best practices.

🏗️ This a fullstack project repos with:

- [`/backend`](/backend/): containing the backend project, and
- [`/frontend`](/frontend/): containing the frontend

## 🛠️ Tech Stack

This hands-on app supports:

- [x] **Nestjs**🐈‍⬛: for backend development with
- [x] **Angular**: for UI development
- [x] **Docker**🐬: for containerization
- [x] **GitHub Actions**✅: for ci/cd
- [x] **Terraform**: for IaC and infrastructure setup
- [x] **Azure**: to host the infrastructure/app
- [x] **CMake**

## 🚀 Get Started

### Using Docker

Make sure to have **Docker** installed on your PC

Run this compose command:

```sh
docker compose -f ./docker-compose.yml up --build
```

It'll launch the db, backend, and frontend service.

Open in the browser:

- Swagger API: 👉 <http://localhost:3000/api>
- Angular App: 👉 <http://localhost:4200>

### Using Makefile

With [Chocolatey]( https://chocolatey.org/) you can quickly install `make` on your PC.

👉 Install **Chocolatey** [here]( https://chocolatey.org/install)

👉 Install make:

Open your command line with admin rights, and install make with the command below:

```sh
choco install make
```

#### Run the app

Start up your Docker client, and:

```sh
# run backend and fronend
make up

# build app
make build

# stops services
make down

# restart the app
make restart

# clean docker
make clean

# logs
make logs

# help
make help
```

## Infrastructure as Code (IaC) with Terraform

```sh
cd infra
```

Initialize Terraform

```sh
terraform init -upgrade
```

Create a terraform execution plan

```sh
terraform plan -out main.tfplan
```

Apply the execution plan

```sh
terraform apply main.tfplan
```

Clean up resources / Destroy the execution plan

```sh
terraform plan -destroy -out main.destroy.tfplan
```

## Key takeaways

### Networking, TypeORM and Azure PostgreSQL

- When you deploy a TypeORM app to production, always use migrations to sync your database schema. DB relations are not created automatically in production mode.
- Make sure to set the `synchronize` option to `false` (in `app.module.ts`) in production environment. Otherwise it will destroy and recreate your database schema on every app restart, leading to data loss.
- Azure does not create your database for you. You need to create it manually or via a script after deploying your infrastructure.
- If you're trying to connect your Azure App Service to PostgreSQL server, always make sure to:
  1. Enable SSL connection
  2. Either (i) allow all Azure services to access the server *(Not recommended in Production environment)* or (ii) add the outbound IP addresses of your App Service to the PostgreSQL server firewall rules.
- If possible, use Managed Identity to connect your App Service to the database securely without using username/password.
- it's a good practice to encapsulate services under a VNet and subnets for better security.

### Static webapp config

The `staticwebapp.config.json` file in the frontend/src folder is used to configure routing and other settings for Azure Static Web Apps. In this case, it specifies a navigation fallback to `index.html`, which is useful for single-page applications (SPAs) like those built with Angular. This ensures that when a user navigates to a route that doesn't correspond to a physical file, the app will still load correctly by serving `index.html`.

⚠️ All of this because the routing is only known by the frontend app, not by the server.

Example of configuration is as below:

```json
# src/staticwebapp.config.json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": [
      "/*.{css, scss, js}"
    ]
  }
}
```
