#!/bin/bash

rm -rf dist/*

./node_modules/.bin/webpack --output-filename=dist/ReactOnScreen.min.js --optimize-minimize

./node_modules/.bin/babel  --ignore=__tests__ src -d lib
