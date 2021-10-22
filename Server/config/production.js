const config_prod = {
  env: "production",
  jwtPrivateKey: process.env.bookstore_jwtPrivateKey,
  db: process.env.bookstore_db,
};

module.exports = config_prod;

//$env:jwtPrivateKey="bookstore_jwtPrivateKey"
//$env:db="bookstore_db"
//$env:NODE_ENV="production";
