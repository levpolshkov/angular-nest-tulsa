Tulsa Remote Application
========================



Install
-------

The project is divided into frontend (`client`) and backend (`server`).

Install frontend:
```
cd client
npm install
```

Install backend:
```
cd server
npm install
cp .env.default .env
```

Note: The server expects a local instance of MongoDB running.

Upon first npm start in server directory, a default admin user will be created with the following login credentials:
email: nitwit@gitwit.com
password: admin1234


Run
---

Run `npm start` in both the `client` and `server` directories.


Production Build
----------------
#### Prep:
- Increment versions in client/server's package.json
- Commit on `master`
- Checkout `dist`
- Merge in `master`
#### Client Build:
- Run `ng build --prod` from `client/`
- Run `git add -f dist/` from `client`		# We have `dist/` inside of .gitignore, so we need the force flag
#### Server Build:
- Run `nest build` from `server/`
- Run `git add -f dist/` from `server`		# We have `dist/` inside of .gitignore, so we need the force flag
#### Commit and Push
- `git commit -m "Dist build of v${insert-version-here}"
- `git push`


Production Deployment
---------------------
From the AWS server (`ssh apply.tulsaremote.com`):
- `cd /apps/tulsa-remote-live`			# Probably should deploy to staging first
- `git pull`
- `pm2 list`
- `pm2 restart X`						# X is the instance number from above
- TEST THAT IS WORKED


# Rename files/contents
```
find . -type f -exec rename 's/product/application-response/' {} \;
find . -type f -exec sed -i 's/product/applicationResponse/g' {} \;
find . -type f -exec sed -i 's/Product/ApplicationResponse/g' {} \;
```

