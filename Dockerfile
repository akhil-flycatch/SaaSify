# -------- Builder --------
FROM node:18-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# -------- Runtime (Nginx) --------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# remove default config
RUN rm -rf ./*

# copy built assets
COPY --from=builder /app/dist .

# SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
