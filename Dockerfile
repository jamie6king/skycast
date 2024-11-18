# setup builder
FROM node:20 AS builder
WORKDIR /app

# install packages
COPY package*.json .
RUN npm install

# add files
COPY . .
RUN npm run build

# setup app
FROM node:20
WORKDIR /app

# install production dependencies
COPY package*.json .
RUN npm install --production

# copy compiled files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# expose the application port
EXPOSE 3000

# run the bundled server file
CMD [ "node", "dist/server/server.bundle.cjs" ]
