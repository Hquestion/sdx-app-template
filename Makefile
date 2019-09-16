# Makefile for image-manager project

# make sure use bash as shell interpreter
SHELL := /bin/bash

# Constants used throughout
.EXPORT_ALL_VARIABLES:

OUTPUTPATH := $(CURDIR)/output
YARNCMD := $(shell which yarn 2>/dev/null)

define HELP_INFO
Usage:
	make <Target>

Target:
	setup    	setup develop env
	run        	startup service
	build    	build docker image and helm package
	check   	use pylint to check module(s) satisfy coding standard or syntax
	clean    	cleanup *.pyc and output dir
	test     	run unit test for code
	clean-env  	cleanup env
	help     	show this help info

Example:
	make setup
	make build
	make run
	make check
	make clean
	make clean-env
	make test
	make help
endef

.PHONY: all
all: help

.PHONY: setup
setup:
	$(info start to setup develop env ...)
	$(YARNCMD) install

.PHONY: run
run:
	$(info start to startup service ...)
	$(YARNCMD) run serve

.PHONY: check
check:
	$(info start to check syntax ...)
	$(YARNCMD) run lint

.PHONY: test
test:
	$(info start to run unit testing ...)
	$(YARNCMD) run test

.PHONY: clean
clean:
	$(info start to cleanup ...)
	@echo
	rm -rf $(OUTPUTPATH)

.PHONY: build
build: clean
	$(info start to build ...)
	@echo
	dos2unix $(CURDIR)/build/docker/run.sh
	dos2unix $(CURDIR)/build/build.sh
	dos2unix $(CURDIR)/build/install.sh
	bash $(CURDIR)/build/build.sh

.PHONY: test-in-docker
test-in-docker:
	$(info skip test ...)

.PHONY: help
help:
	@echo "$$HELP_INFO"
