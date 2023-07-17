
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const generateSpecialID = () => {
  return uuidv4();
};

const logRequest = (request) => {
  if (request && request.method) {
    const logData = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      id: generateSpecialID(), // Generate a unique ID for the request
      message: `Request: ${request.method} ${request.url} ${request.protocol}://${request.get('host')}`,
    };

    const logValues = Object.values(logData).join(' ');
    const log = `[Request] ${logValues}\n`;

    fs.appendFile('logs/reqLog.log', log, (err) => {
      if (err) {
        console.error('Error :', err);
      }
    });
  }
};

module.exports = { logRequest };


