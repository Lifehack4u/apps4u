const { registerMiddlewares, registerRoutes, start } = require('./core/apico');

/**
 * Register all midllewares
 */
//registerMiddlewares();

/**
 * Register all routes;
 */
registerRoutes();

// Start the app
start();