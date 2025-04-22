#!/usr/bin/env bash
# exit on errors
set -o errexit

# Install the necessary dependencies
npm install

# Ensure Puppeteer cache is set up correctly
if [[ ! -d $PUPPETEER_CACHE_DIR ]]; then
  echo "...Puppeteer Cache directory not found, creating new cache."
  mkdir -p $PUPPETEER_CACHE_DIR
fi

# Copy Puppeteer cache to the build directory if not already present
if [[ ! -d /opt/render/.cache/puppeteer/ ]]; then
  echo "...Copying Puppeteer Cache from Build Cache"
  cp -R $XDG_CACHE_HOME/puppeteer/ $PUPPETEER_CACHE_DIR
else
  echo "...Storing Puppeteer Cache in Build Cache"
  cp -R $PUPPETEER_CACHE_DIR $XDG_CACHE_HOME
fi
