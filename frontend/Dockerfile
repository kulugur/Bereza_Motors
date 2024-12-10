FROM node:20.18.0-alpine as builder

COPY package.json package.json

RUN npm install 
COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /dist /usr/share/nginx/html
COPY --from=builder nginx.conf /etc/nginx/confg.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g","daemon off;" ]