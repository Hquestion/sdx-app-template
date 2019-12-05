# Introduction

This repo contains sdx-ui and nginx-proxy.

## Start

> 必须：设置yarn或npm registry='http://192.168.20.38:4873'

## Package.json 配置

+ ComponentDevEnv： Boolean

使用组件库开发环境模式，设置为```true``` 时，@sdx/xx/lib将是@sdx/xx/components的别名（webpack alias）


## UI

> 也可使用npm

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Build
```
bash ui-build.sh
```
Then dist dir is under repo root dir.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Nginx

### build docker image
- docker build -t nginx-proxy:0.1.0 -f build/docker/Dockerfile  .

- docker run -d  --name sdxn  -p 49999:80  nginx-proxy:0.1.0  --restart=always

# Build
```
make build
```
`dist` should under repo root dir.
