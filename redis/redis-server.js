const RedisServer = require('redis-server');
 
const server = new RedisServer({
  // This path will need to be abstracted away
  conf: '/Users/Tim/Documents/HRSF84/repos/thesis/hrsf84-thesis/redis/redis.conf'
});

server.open().then(() => {
  // To do: investigate why console.log is not printing
  
  console.log('The Redis cache is up on and running');
});