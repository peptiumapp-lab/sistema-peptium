process.env.NODE_ENV = 'production';
require('./dist/server.cjs');
setTimeout(() => process.exit(0), 1000);
