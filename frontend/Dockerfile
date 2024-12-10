FROM node:20-alpine as builder
COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
# WORKDIR /usr/src/app
# COPY package.json package.json
# RUN npm config set legacy-peer-deps true
# RUN npm install 


# COPY . .
# RUN npm run build --configuration=production

# FROM nginx:alpine

# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# COPY --from=builder nginx.conf /etc/nginx/confg.d/default.conf
# EXPOSE 80 443
# CMD [ "nginx", "-g", "daemon off;" ]

