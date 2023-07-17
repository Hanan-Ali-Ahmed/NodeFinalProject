require('dotenv').config()
const express = require('express');
const app = express()
const path = require('path')
const fs = require('fs');
const { handleError } = require('./middleware/errorHandler');
const { logRequest } = require('./middleware/logger');   
const cors = require('cors');
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbconnect')

const mongoose = require('mongoose')
     
const PORT = process.env.PORT || 5000
require('./config/dbconnect')
// connectDB()

app.use(cors(corsOptions))

app.use(express.json());
const userRoutes = require('./routes/userRoutes')

app.use(cookieParser())
app.use(userRoutes)
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use( require('./routes/authRoutes'))

app.use(require('./routes/userRoutes'))
app.use(require('./routes/noteRoutes'))

const logEvents = './logs';
if (!fs.existsSync(logEvents)) {
  fs.mkdirSync(logEvents);
}

// Log requests middleware
app.use((req, res, next) => {
  logRequest(req);
  next();
});



app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

  
//  Error handling middleware
app.use((error, req, res, next) => {
  if (!error.logged) {
    handleError(error, req);
    error.logged = true;
  }
  res.status(500).json({ error: error ? error.message : 'Internal Server Error' });
});
     
app.listen(PORT, () => {
  console.log('Server Listening On Port 5000');
});
mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})  