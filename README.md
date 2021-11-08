# scripts-allin
run multiple scripts on a terminal

# install
```sh
npm install scripts-allin -g 
```

# use
```json
// package.json
"scripts": {
    "dev":"scripts-allin --npm-script dev:watch dev:nodemon",
    "dev:watch": "tsc -w",
    "dev:nodemon":"nodemon build/index.js",
    "build": "tsc",
    "start:stable": "SERVER_ENV=stable node build/index.js",
    "start:online": "SERVER_ENV=online node build/index.js"
  },
```
we make multiple npm scripts on a terminal,for example 'dev' script