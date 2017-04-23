#!/bin/bash

rm -rf dist/*

./node_modules/.bin/webpack --output-filename=dist/ReactOnScreen.min.js

./node_modules/.bin/babel src -d lib
