#!/bin/sh
mongodump --uri "mongodb+srv://tulsa-remote:7dnkwjGhAHUhQ8RG@tulsa-remote.o9u9i.mongodb.net/tulsa-remote-application-live"  --gzip
mongorestore --gzip -d tulsa-remote --drop dump/tulsa-remote-application-live
# rm -rf dump/
