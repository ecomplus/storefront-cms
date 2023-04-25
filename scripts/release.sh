#!/bin/bash

cd static-cms
yarn test || exit 1
cd ..
npm run build || exit 1
git add dist
npx standard-version --commit-all
