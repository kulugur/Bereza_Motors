FROM node:20.18.0-alpine as builder
WORKDIR /app
COPY package.json package.json

RUN npm install --force
COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist/comp-lib /usr/share/nginx/html
COPY --from=builder nginx.conf /etc/nginx/confg.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g","daemon off;" ]