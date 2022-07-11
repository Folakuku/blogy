const session = require("express-session");
const MongoStore = require("connect-mongo");

const newSession = session({
  secret: "secret key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.dbURI }),
  // cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 },
});

module.exports = { newSession };
