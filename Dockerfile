FROM centos:latest
MAINTAINER Luis Paz, Henry López
RUN yum -y install httpd
COPY dist/Renap /var/www/html
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
EXPOSE 80
