'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastifyStatic = require('fastify-static')

const fastify = require('fastify')({
  logger: true
})
// const start = async () => {
//   try {
//     await fastify.listen()
//   } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }
// start()
// Run the server!
// fastify.listen(3001, function (err, address) {
//   if (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
//   // Server is now listening on ${address}
// })
module.exports = async function (fastify, opts) {
  // Place here your custom code!
  
  // Do not touch the following lines
  
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  
  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
    index: false,
    list: true
  })


  // fastify.register(fastifyStatic, {
  //   root: path.join(__dirname, 'wtf'),
  //   prefix: '/wtf/', // optional: default '/'
  //   decorateReply: false // the reply decorator has been added by the first plugin registration
  // })

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'node_modules'),
    prefix: '/js/',
    decorateReply: false // the reply decorator has been added by the first plugin registration
  })
  

  // In this example, when you get localhost:3000, ou have the time
  fastify.get('/time', (request, reply) => {
    reply.header('Content-Type','application/json')
    reply.send({hello: new Date()})
  })
  fastify.get('/about', (request, reply) => {
    reply.sendFile('about.html')
  })
  fastify.get('/lewit', (request, reply) => {
    reply.sendFile('lewit.js')
  })

  fastify.get('/', (request, reply) => {
    reply.sendFile('foo.html')
  })
  
  // fastify.get('/another/path', function (req, reply) {
  //   return reply.sendFile('myHtml.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
  // })
  
  // fastify.get('/path/with/different/root', function (req, reply) {
  //   return reply.sendFile('myHtml.html', path.join(__dirname, 'build')) // serving a file from a different root location
  // })
  
}