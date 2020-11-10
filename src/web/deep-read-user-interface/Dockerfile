# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets


FROM node:13.12.0-alpine as build

# Set the working directory.
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# Copy the file from your host to your current location.
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./
RUN npm run build


# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker run --rm -it -p 8080:80 deep-read-user-interface