#!/bin/bash
set -ev
if [ $TRAVIS_BRANCH != "cesium.com" ]; then
  npm --silent run build-release
  npm --silent run test -- --browsers ChromeCI --failTaskOnError --webgl-stub --release --suppressPassed
  npx playwright install-deps
  npm --silent run test-e2e
fi
