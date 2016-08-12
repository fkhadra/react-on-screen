#!/bin/sh

rm -rf dist/*

./node_modules/.bin/webpack --output-filename=dist/ReactOnScreen.js
./node_modules/.bin/webpack --output-filename=dist/ReactOnScreen.min.js --optimize-minimize

./node_modules/.bin/babel src -d lib