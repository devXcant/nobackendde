
const app = require('./app')

// Start server
const port = 3000;

app.listen(port, () => {
    console.log('im watching you on ' + port);
});