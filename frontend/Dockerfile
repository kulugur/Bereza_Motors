FROM node:20.18.0-alpine as build-stage
COPY package.json package.json

RUN npm install --force
COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /dist /use/share/nginx/html
COPY --from=build-stage nginx.conf /etc/nginx/confg.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g","daemon off;" ]