#!/bin/bash

log_info()
{
    echo -e "info: $*" >&2
}

log_error()
{
    echo -e "\\x1b[1;31merror: $* \\x1b[0m" >&2
}

init_dir()
{
    rm -rf $OUTPUT_DIR
    mkdir -p $OUTPUT_DIR
}

build_dict()
{
    docker run --network host -v "$ROOT_DIR":/app node:lts-alpine sh -c "npm config set registry http://192.168.20.38:4873 \
        && cd /app \
        && npm install \
        && npm run build" || return
}

ROOT_DIR=$(cd $(dirname $0); pwd)
OUTPUT_DIR=$ROOT_DIR/output

log_info "init dir ..."
init_dir || exit

log_info "build dict ..."
build_dict || exit
