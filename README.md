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


# Rename files/contents
```
find . -type f -exec rename 's/product/application-response/' {} \;
find . -type f -exec sed -i 's/product/applicationResponse/g' {} \;
find . -type f -exec sed -i 's/Product/ApplicationResponse/g' {} \;
```

