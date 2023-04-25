#!/bin/bash

cd static-cms
yarn build || exit 1
cd ..
npx ncp static-cms/packages/app/dist ./dist
