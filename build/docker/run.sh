#!/bin/bash
{
  echo "register aggr api"
  cd /web/axe/static/dist/gateway
  /node-v8.13.0-linux-x64/bin/node register
}&

{
    echo "generete confd onetime from env"
    confd -onetime -backend env
}&


{
    echo "Starting confd"

    # these keys is volume mounted
    etcd_ca="/etc/kubernetes/pki/etcd/ca.pem"
    etcd_cert="/etc/kubernetes/pki/etcd/client.pem"
    etcd_key="/etc/kubernetes/pki/etcd/client-key.pem"
    confd --backend etcdv3\
        -node "$ETCD_HOST:$ETCD_PORT" \
        -client-ca-keys "$etcd_ca" \
        -client-cert "$etcd_cert" \
        -client-key "$etcd_key" \
        -interval 5 \
        --log-level debug
}&

{
  echo "Starting nginx"
  openresty -c /etc/nginx/nginx.conf && exit 1
}&

echo "nginx end"

wait $nginx_pid || exit 1
