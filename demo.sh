#!/usr/bin/env bash
rm -fr dist
rm -fr ui
unzip -O CP936 dist.zip

make build

dos2unix version
cd build

dos2unix install.sh
dos2unix build.sh
bash install.sh
