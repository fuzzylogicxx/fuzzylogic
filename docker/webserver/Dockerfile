FROM php:7-apache

COPY fuzzylogic.me.conf /etc/apache2/sites-enabled/

RUN apt-get update -y && apt-get install -y curl libcurl4-openssl-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
&& docker-php-ext-install -j$(nproc) pdo pdo_mysql curl \
&& docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
&& docker-php-ext-install -j$(nproc) gd \
&& a2enmod rewrite \
&& service apache2 restart
