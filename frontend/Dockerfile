# dockerfile of angular application
FROM node:22-alpine AS development

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .

EXPOSE 4200

# "--host 0.0.0.0" to allow access from outside the container
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]


FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci 
COPY . .
RUN npm run build --prod

# Production server
FROM nginx:alpine AS production
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html

# local nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
