const { server } = require('./app');

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
