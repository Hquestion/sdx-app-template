# FROM 192.168.20.38/build/nginx:1.15.1
FROM openresty/openresty

RUN apt-get update && apt-get install -y vim procps curl net-tools

# default config
#ADD build/docker/nginx/web-flask.conf /etc/nginx/conf.d/default.conf
ADD build/docker/nginx/nginx.conf /etc/nginx/nginx.conf

# setup confd
ADD build/docker/confd/confd-0.16.0-linux-amd64 /usr/bin/confd
ADD build/docker/confd/confd /etc/confd

# cannot use {a,b} to create, docker would create a dir named as "{a,b}"
RUN mkdir -p /etc/nginx/confd-generated/http && mkdir -p /etc/nginx/confd-generated/tcp

# parpare log files for es
#RUN ln -sf /dev/stdout /var/log/nginx/access.log \
#    && ln -sf /dev/stderr /var/log/nginx/error.log

ADD dist /web/axe/static/dist

ADD build/docker/webhelp /webhelp

ADD build/docker/run.sh /run.sh
# will auto tar xzvf
ADD build/docker/node-v8.13.0-linux-x64.tar.gz /
RUN chmod 777 /node-v8.13.0-linux-x64/bin/*
RUN ln -s /node-v8.13.0-linux-x64/bin/node /usr/bin/node
RUN ln -s /node-v8.13.0-linux-x64/bin/npm /usr/bin/npm


CMD ["/run.sh"]
