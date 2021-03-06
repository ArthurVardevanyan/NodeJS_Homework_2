require('dotenv').config();

const Mongoose = require('mongoose');

const Express = require('express');

const app = Express();

const BodyParser = require('body-parser');

app.use(BodyParser.json());

const ProductRoute = require('./routes/product.route');
const UserRoute = require('./routes/user.route');

app.use('/products', ProductRoute); // Product Endpoint
app.use('/users', UserRoute); // User Endpoint

(async () => {
  try { // Try / Catch for Checking if Database Connection Works.
    await Mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,

    });
    app.listen(8000);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(new Error('Database Connection Error, Check Credentials: '.concat(e.message)));
  }
})();

module.exports = app;
