FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy over certs for localhost
RUN mkdir /etc/nginx/certs
COPY  ./certs /etc/nginx/certs/

RUN echo '🦁 shuffl shuffl'

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/

RUN nginx -t

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]