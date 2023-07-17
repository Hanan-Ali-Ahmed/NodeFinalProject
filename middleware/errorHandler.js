const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const handleError = (error, request) => {
  const logData = {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    id: generateSpecialID(), 
    message: `${error.name}: ${error.message}`,
    url: request ? `${request.method} ${request.url}` : 'Unknown URL',
    origin: request ? `${request.protocol}://${request.get('host')}` : 'Unknown Origin',
    port: request && request.app ? request.app.get('port') : 'Unknown Port', // 
  };
  const logValues = Object.values(logData).join(' ');

  const log = `[Error] ${JSON.stringify(logValues)}\n`;

  fs.appendFile('logs/errLog.log', log, (err) => {
    if (err) {
      console.error('Error', err);
    }
  });
};

const generateSpecialID = () => {
  return uuidv4();
};

module.exports = { handleError };
