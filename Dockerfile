# Start with Ubuntu Trusty
FROM  phusion/baseimage:0.10.0

# Use baseimage-docker's init system.
CMD   ["/sbin/my_init"]

RUN	apt-get update
RUN apt-get -y install wget
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get -y install nodejs git-core
RUN npm install pm2 -g --no-optional
RUN npm install yarn@1.9.4 -g

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy source files to container
COPY	. /var/www/node

# Change owner to non-root node user and set up permissions
RUN chmod -R 777 var/www/node /var/log/
RUN useradd -m node && mkdir /var/log/nodejs && chown -R node:node /var/www/node /var/log/

# Install all my packages and build
RUN	cd /var/www/node && /sbin/setuser node yarn install && /sbin/setuser node yarn build:tsoa

# Open local port 3000
EXPOSE	3030

# Run PM2 as a daemon managed by runit
RUN mkdir /etc/service/pm2 && chmod -R 777 /etc/service/pm2
ADD ./scripts/pm2.sh /etc/service/pm2/run
RUN chmod -R 777 /etc/service/pm2
