const cors = require("cors");

module.exports = function(app) {
  app.use(cors({ origin: "*" }));
  //app.options("*", cors());

    // const corsOptions = {
    //   origin: "*",
    //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   allowedHeaders:
    //     "Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token",
    //   credentials: true,
    //   preflightContinue: false,
    //   optionsSuccessStatus: 204,
    // };

    // app.use(cors(corsOptions));
};
