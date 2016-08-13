#!/bin/sh

rm -rf dist/*

#Full path because of W

./node_modules/.bin/webpack --output-filename=dist/ReactOnScreen.js
./node_modules/.bin/webpack --output-filename=dist/ReactOnScreen.min.js --optimize-minimize

./node_modules/.bin/babel src -d lib
