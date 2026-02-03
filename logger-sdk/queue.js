const CONFIG = require('./config');
let queue = [];

function flushQueue() {
  if (queue.length === 0 ) return;

  const logsToSend = [...queue];
  queue = [];

  fetch('https://saas-monitoring-system-server-2.onrender.com/api/logs', {
    method: 'POST',
    headers: {
  'Content-Type': 'application/json',
  'x-api-secret': CONFIG.api_key, 
  
},
    body: JSON.stringify(logsToSend),
  }).catch(console.error);
}

setInterval(flushQueue, 10000);

 function addLog(log) {
  queue.push(log);
}
module.exports = {addLog}