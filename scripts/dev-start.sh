#!/bin/bash

# Start the development database via docker-compose
./scripts/restart-database.dev.sh &&

# Start the development server
yarn start:dev