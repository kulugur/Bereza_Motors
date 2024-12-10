FROM node:alpine as build
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /dist /use/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/confg.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g","daemon off;" ]