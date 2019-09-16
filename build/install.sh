log_info()
{
    echo -e "info: $*" >&2
}


load_image()
{
    local image_name="$1"
    cd $ROOT_DIR || return

    echo "$OUTPUT_DIR/images/$image_name.tar"

    docker load -i "$OUTPUT_DIR/images/$image_name.tar"
}

install_helm()
{
    local image_name="$1"
    cd $ROOT_DIR || return
    echo "$OUTPUT_DIR/helm/$image_name.tgz"

    helm delete --purge "$image_name" || exit
    helm install --name "$image_name"  --namespace skydiscovery-system  "$OUTPUT_DIR/helm/$image_name.tgz"
}


NAME="nginx-proxy"

BUILD_DIR=$(cd $(dirname $(dirname $0)); pwd)

echo "-------------ROOT_DIR" $ROOT_DIR $(dirname $(pwd))

ROOT_DIR=$(dirname $(pwd))

OUTPUT_DIR=$ROOT_DIR/output


log_info "load docker tar ..."

load_image "$NAME" || exit


log_info "install helm image ..."

install_helm "$NAME" || exit

