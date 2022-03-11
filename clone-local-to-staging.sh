#!/bin/sh

# TODO: Refactor from clone-prod-to-local.sh

mongodump --gzip -d tulsa-remote

mongorestore -uri "mongodb+srv://tulsa-remote.o9u9i.mongodb.net" \
	--ssl --username tulsa-remote --password 7dnkwjGhAHUhQ8RG --authenticationDatabase admin --db tulsa-remote-application-staging --gzip --drop dump/tulsa-remote

# rm -rf dump/
