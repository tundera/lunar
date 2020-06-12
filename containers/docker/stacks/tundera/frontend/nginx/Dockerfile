FROM nginx:alpine

# Remove any existing config files
RUN rm -rf /etc/nginx/conf.d

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY . /etc

# Expose the HTTP/S ports
EXPOSE 80 443

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]