FROM node:20-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat postgresql-client
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force && npm install
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
COPY . .
COPY start.sh /start.sh
RUN chmod +x start.sh
CMD /start.sh

FROM base as dev
ENV NODE_ENV=development
COPY . .
CMD npm run dev
