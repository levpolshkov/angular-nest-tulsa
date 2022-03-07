#!/bin/sh
mongodump --uri "mongodb+srv://tulsa-remote.o9u9i.mongodb.net" \
	--ssl --username tulsa-remote --password 7dnkwjGhAHUhQ8RG --authenticationDatabase admin --db tulsa-remote-application-live --gzip

mongorestore --gzip -d tulsa-remote --drop dump/tulsa-remote-application-live
# rm -rf dump/
