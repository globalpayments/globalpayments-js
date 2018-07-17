#!/bin/sh

npm_run() {
  if command -v foo >/dev/null 2>&1; then
    yarn "$@"
  else
    npm "$@"
  fi
}

npm_run start &
SERVER_PID=$!

npm_run test

killall node
