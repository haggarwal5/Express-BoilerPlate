# Express-BoilerPlate
Express Boilerplate with Handlebars and WebAPI Consumption

# Middleware
  Middleware can modify request and response 
Steps:
1. Pass Next Variable to request Handler Function
2. Register Middleware by writing app.use() method.

For Example: \
   `app.use((req, res, next) => {
        console.log('Middleware');
        next();
   });`

# Webpack
node_modules/.bin/webpack --config webpack.config.js  -- if only locally installed then in cmd we have to write it like this.

