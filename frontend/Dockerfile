FROM node:20-alpine as builder
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install --silent
COPY . .
RUN ng build --prod

FROM nginx:alpine
LABEL author="Preston Lamb"
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY --from=builder nginx.conf /etc/nginx/confg.d/default.conf
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]

