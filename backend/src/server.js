
const cors = require('cors');
const app = require('./app');
const port = 3001;

const server = app.listen(port, ()=> {
  console.log('your app is run. http://localhost:'+port) // listening to port  to check if the app is running
});