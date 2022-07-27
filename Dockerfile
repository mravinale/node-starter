# Start with Ubuntu Trusty
FROM node:lts-alpine3.15

# Use baseimage-docker's init system.
CMD   ["/sbin/my_init"]

# Copy source files to container
COPY	. /var/www/node

# Install pm2 runner global
RUN npm install pm2 --location=global --omit=optional

# Set working folder
WORKDIR /var/www/node

# Install all my packages and build
RUN	yarn install && yarn build

# Open local port 3000
EXPOSE	3030

# Run PM2 as a daemon managed by runit
CMD ["pm2-runtime", "pm2.config.js", "--no-daemon"]
