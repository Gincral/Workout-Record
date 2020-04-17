FROM node:12.13.1 as base
RUN mkdir -p /srv/app
COPY . /srv/app
WORKDIR /srv/app
# Install production dependencies
RUN npm install
# Expose port for access outside of container
ENV PORT 3000
EXPOSE $PORT
CMD ["npm", "start"]