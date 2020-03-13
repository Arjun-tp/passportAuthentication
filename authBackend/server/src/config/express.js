const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const routes = require("../api/routes/v1");
const {logs} = require("./vars");
const rateLimit = require("express-rate-limit");
const path = require("path");

/**
 * Express instance
 * @public
 */
const app = express();

app.use("/users", express.static(
        path.join(path.dirname(process.mainModule.filename), "..", "users"))
);

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 500 // limit each IP to 500 requests per windowMs
});

app.use(limiter);

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json({limit: "100mb"}));
app.use(
    bodyParser.urlencoded({
        limit: "100mb",
        extended: true,
        parameterLimit: 100000
    })
);


// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({credentials: true, origin: true}));

app.disable("x-powered-by");

// mount api v1 routes
app.use("/api/v1", routes);


module.exports = app;
