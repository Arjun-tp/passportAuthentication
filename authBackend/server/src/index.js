const { mysql, port, env } = require("./config/vars");
const app = require("./config/express");
const sqldb = require("./config/sequelize");
const logger = require("./api/utils/logger");



/**
 * It starts the server on port
 */
function startServer() {
  // listen to requests
  app.listen(port, () => {
    logger.info(`server started on port ${port} (${env})`);
  });

}

// Sequelize connection
if (mysql.enabled === "true") {
  sqldb.sequelize
    .sync({
      force: false
    })
    .then(startServer)
    .catch(err => {
      logger.log("error", "Server failed to start due to error: %s", err);
    });
  logger.info("MySql Connected!");
}

/**
 * Exports express
 * @public
 */
module.exports = app;
