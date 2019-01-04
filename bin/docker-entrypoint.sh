#!/usr/bin/env sh

if [ "$1" = "seed" ]
then
  npm run cleardb

  sleep 3

  npm run seed
  exit 0
fi


npm run start
