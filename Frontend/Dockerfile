FROM debian:latest
LABEL maintainer="PGGP"
RUN apt-get -y update
RUN apt-get install -y apache2
RUN rm /var/www/html/*
COPY . /var/www/html/
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
EXPOSE 80
