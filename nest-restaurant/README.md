# Tutorial for Angular/Nestjs/Auth0

This is an implemenation of the tutorial https://auth0.com/blog/full-stack-typescript-apps-part-1-developing-backend-apis-with-nestjs/ which builds an angular app and a NestJs backend, running against an Auth0 identity service.

The user for auth0.com is auth0.ngan@spamgourmet.com


# Start REST API

```
cd nest-restaurant-api
npm run start:dev
```

# Start Angular App
```
cd angular-restaurant-app
ng serve
```

Browse to http://localhost:4200/


### Login Normal user
Username: menuapp-user1.ngan@spamgourmet.com/Password123

A normal user can add to shopping cart


### Login Admin user
Username: menuapp.ngan@spamgourmet.com/Password123

An admin user can add to shopping cart and add new menu items (the UI has an additional form for doing this)

### An unregistered user (in Auth0)

An unregistered user can list the food menu, but cannot add items to shopping cart