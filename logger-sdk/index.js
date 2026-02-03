const CONFIG = require('./config');
const { addLog } = require('./queue');

function init({   api_key }) {

  CONFIG.api_key = api_key;
}

function middleware() {
  
  return (req, res, next) => {
    const timestamp = Date.now();

    res.on('finish', () => {
      const log = {
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        timestamp,
       
      };

      addLog(log);
    });

    next();
  };
}


module.exports = {
  init,
  middleware
};