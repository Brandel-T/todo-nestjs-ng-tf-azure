[![Fullstack Todo | Test CI](https://github.com/Brandel-T/fullstack-nestjs-ng-azure-tf/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Brandel-T/fullstack-nestjs-ng-azure-tf/actions/workflows/ci.yml)

# fullstack-nestjs-ng-azure-tf

A full-stack application from design to deployment on Azure, including IaC via Terraform.

This a fullstack project repos with:

- [`/backend`](/backend/): containing the backend project, and
- [`/frontend`](/frontend/): containing the frontend

## Tech Stack

This hands-on app supports:

- [x] **Nestjs**🐈‍⬛: for backend development with
- [x] **Angular**: for UI development
- [x] **Docker**🐬: for containerization
- [x] **GitHub Actions**✅: for ci/cd
- [x] **Terraform**: for IaC and infrastructure setup
- [x] **Azure**: to host the infrastructure/app
- [x] **CMake**

## Get Started

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
