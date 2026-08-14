#!/bin/bash
cd "$(dirname "$0")"
#echo 'Removing old docker containers' 
#docker system prune -f
echo '\nLogging in @ AWS Container Registry' 
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 723178373366.dkr.ecr.eu-central-1.amazonaws.com 
echo '\nFetching new containers' 
# DISABLED 2026-08-04: bare image tag floats postgres to :latest (now 18.x), which
# relocates PGDATA and would silently initdb an EMPTY cluster. Re-enable only after
# the postgres image is pinned everywhere.
# docker compose pull
#echo '\nShutting down containers' docker-compose down
echo '\nLaunching containers' docker compose up -d 
echo '\nRemove old docker containers'
# DISABLED 2026-08-04: removes stopped containers, which orphans the Postgres data
# volume and makes it eligible for volume prune. Use docker builder prune for space.
# docker system prune -f
