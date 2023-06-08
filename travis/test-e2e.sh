set -ev
if [ $TRAVIS_BRANCH != "cesium.com" ]; then
  npm --silent run build-release
  npm --silent run test-e2e
fi
