#!/usr/bin/env bash

code_dir=/SkyDiscovery/data/yang.zheng/personal/nginx-proxy
host=10.115.1.130

#将本地的代码同步到服务器/web/axe下
sync_codebase()
{
    local src_dir=$1
    local code_dir="$2"
    ssh root@$host mkdir -p $code_dir
    rsync -avzh \
        --exclude "output" \
        --exclude "builds" \
        --exclude "__pycache__"\
        --exclude ".git"\
        --exclude "*.pyc"\
        --exclude "node_modules"\
        $src_dir root@$host:$code_dir

}


sync_codebase . $code_dir