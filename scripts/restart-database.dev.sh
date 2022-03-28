#!/bin/bash

echo "Restarting the development database..."

echo "$OSTYPE"

if [[ "$OSTYPE" == "linux-gnu" ]]; then
    docker-compose -f docker-compose.dev.yml rm -f -s -v dev-database &&
    docker-compose -f docker-compose.dev.yml up -d dev-database
else
    docker compose -f docker-compose.dev.yml rm -f -s -v dev-database &&
    docker compose -f docker-compose.dev.yml up -d dev-database
fi
sleep 3 &&
yarn prisma:migrate:dev
