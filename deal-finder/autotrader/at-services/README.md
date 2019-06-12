
# README.md

This is an nestjs app. To run, you need node and nestjs cli install on your dev machine.

## First time setup
```npm install```

## Running the app in watch mode
```npm run start:dev```

## Test
```curl -s http://localhost:3000/at/makes```


## This web service calls out to the python analysis web service
```https://github.com/pngan/analysis```

## Deploying to Heroku

The nodejs was not located at root of git repository.


cd <root of git repo>
heroku buildpacks





Setting up nodejs
https://www.joshmorony.com/deploying-a-production-nestjs-server-on-heroku/

Git subtree
https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku
