#!/bin/bash

rm -rf build-template

git clone -q ssh://git@bitbucket.iluvatar.ai:7999/csdx/build-template.git

source build-template/lib/build.sh

build_dist()
{
    log_info "build ui ..."
    docker run --rm --network host -v "$ROOT_DIR":/app node:lts-alpine sh -c "npm config set registry http://192.168.20.38:4873 \
        && cd /app \
        && npm install \
        && npm run build" || return
}

user_extra_operation()
{
    build_dist || return 1
}

export_build_config || exit
init_dir || exit
user_extra_operation || exit
build_image || exit
build_helm || exit
copy_permission_file || exit
extra_operation || exit
